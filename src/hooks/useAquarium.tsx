import { useEffect } from 'react';
import Matter from 'matter-js';
import { SeafoodCollected } from '../api/home';

const AQUARIUM_IMAGE_PATH = '/images/Aquarium/';
const SEAFOOD_IMAGE_PATH = '/images/Seafoods/';

export const useAquarium = (
  containerRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  seafoods: SeafoodCollected[],
) => {
  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const Events = Matter.Events;

    const engine = Engine.create();
    engine.gravity.x = 0;
    engine.gravity.y = 0.1;

    const container = containerRef.current!;
    let { width, height } = container.getBoundingClientRect();

    const render = Render.create({
      element: container,
      engine: engine,
      canvas: canvasRef.current!,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: `${AQUARIUM_IMAGE_PATH}/Background-01.png`,
      },
    });

    // 초기 벽 생성
    let topWall = Bodies.rectangle(width / 2, 0, width, 20, {
      isStatic: true,
    });
    let leftWall = Bodies.rectangle(0, height / 2, 20, height, {
      isStatic: true,
    });
    let rightWall = Bodies.rectangle(width, height / 2, 20, height, {
      isStatic: true,
    });
    let bottomWall = Bodies.rectangle(width / 2, height, width, 20, {
      isStatic: true,
    });

    World.add(engine.world, [topWall, leftWall, rightWall, bottomWall]);

    const updateSize = () => {
      // 윈도우 리사이즈 시 컨테이너 크기를 재계산
      const { width: newWidth, height: newHeight } =
        container.getBoundingClientRect();

      // 렌더 사이즈 업데이트
      // @ts-expect-error MatterJS types are incomplete
      Matter.Render.setSize(render, newWidth, newHeight);

      // 벽 위치 재조정
      Matter.Body.setPosition(topWall, { x: newWidth / 2, y: 0 });
      Matter.Body.setPosition(leftWall, { x: 0, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth, y: newHeight / 2 });
      Matter.Body.setPosition(bottomWall, { x: newWidth / 2, y: newHeight });

      // 벽 크기도 변해야 한다면, remove 후 다시 add하거나 Body.scale 사용 가능
      // width/height 변화를 반영하기 위해 벽을 다시 생성해보는 방법:
      World.remove(engine.world, topWall);
      World.remove(engine.world, leftWall);
      World.remove(engine.world, rightWall);
      World.remove(engine.world, bottomWall);

      topWall = Bodies.rectangle(newWidth / 2, 0, newWidth, 20, {
        isStatic: true,
      });
      leftWall = Bodies.rectangle(0, newHeight / 2, 20, newHeight, {
        isStatic: true,
      });
      rightWall = Bodies.rectangle(newWidth, newHeight / 2, 20, newHeight, {
        isStatic: true,
      });
      bottomWall = Bodies.rectangle(newWidth / 2, newHeight, newWidth, 20, {
        isStatic: true,
      });

      World.add(engine.world, [topWall, leftWall, rightWall, bottomWall]);

      width = newWidth;
      height = newHeight;
    };

    window.addEventListener('resize', updateSize);

    seafoods.forEach((seafood) => {
      const seafoodImage = new Image();
      seafoodImage.src = `${SEAFOOD_IMAGE_PATH}${seafood.englishName}.svg`;

      seafoodImage.onload = () => {
        for (let i = 0; i < seafood.count; i++) {
          const body = Bodies.circle(
            Math.random() * (width - 100) + 50,
            Math.random() * (height - 100) + 50,
            30,
            {
              restitution: 0.3,
              friction: 0.1,
              render: {
                sprite: {
                  texture: seafoodImage.src,
                  xScale: 0.6,
                  yScale: 0.6,
                },
              },
            },
          );
          World.add(engine.world, body);
        }
      };
    });

    const diverImage = new Image();
    diverImage.src = `${AQUARIUM_IMAGE_PATH}/sumbi.png`;

    diverImage.onload = () => {
      const diverBody = Bodies.rectangle(width / 2, height / 2, 50, 100, {
        isStatic: false,
        render: {
          sprite: {
            texture: diverImage.src,
            xScale: 0.2,
            yScale: 0.2,
          },
        },
        collisionFilter: {
          category: 0x0002,
          mask: 0x0000,
        },
      });

      World.add(engine.world, diverBody);

      let direction = 1;
      Events.on(engine, 'beforeUpdate', () => {
        const minY = height / 2;
        const maxY = height / 2 + 5;

        if (diverBody.position.y >= maxY) {
          direction = -1;
        } else if (diverBody.position.y <= minY) {
          direction = 1;
        }

        Matter.Body.applyForce(diverBody, diverBody.position, {
          x: 0,
          y: direction * 0.0008,
        });
      });
    };

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
      collisionFilter: {
        mask: 0x0001,
      },
    });

    World.add(engine.world, mouseConstraint);

    const bodies = engine.world.bodies;
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body) => {
        const maxSpeed = 3;
        const velocity = body.velocity;

        if (
          Math.abs(velocity.x) > maxSpeed ||
          Math.abs(velocity.y) > maxSpeed
        ) {
          Matter.Body.setVelocity(body, {
            x: Math.sign(velocity.x) * Math.min(Math.abs(velocity.x), maxSpeed),
            y: Math.sign(velocity.y) * Math.min(Math.abs(velocity.y), maxSpeed),
          });
        }
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      window.removeEventListener('resize', updateSize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [containerRef, canvasRef, seafoods]);
};
