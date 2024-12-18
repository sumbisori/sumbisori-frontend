import { useEffect } from 'react';
import Matter from 'matter-js';
import { SeafoodCollected } from '../api/home';
import { IMAGE_PATHS } from '../constant';

export const useAquarium = (
  containerRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  seafoods: SeafoodCollected[],
) => {
  useEffect(() => {
    // 1. 엔진 및 렌더 초기화
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Events = Matter.Events;
    const pixelRatio = window.devicePixelRatio || 1;

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
        background: `${IMAGE_PATHS.AQUARIUM}/Background-01.png`,
        pixelRatio: pixelRatio,
      },
    });

    // 벽 생성
    let topWall = Bodies.rectangle(width / 2, 0, width, 20, {
      isStatic: true,
      render: { visible: false },
    });
    let leftWall = Bodies.rectangle(0, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });
    let rightWall = Bodies.rectangle(width, height / 2, 20, height, {
      isStatic: true,
      render: { visible: false },
    });
    let bottomWall = Bodies.rectangle(width / 2, height, width, 20, {
      isStatic: true,
      render: { visible: false },
    });

    World.add(engine.world, [topWall, leftWall, rightWall, bottomWall]);

    // 2. 도메인 오브젝트 추가

    // 배경 레이어 추가
    const addBackgroundLayers = (
      engine: Matter.Engine,
      width: number,
      height: number,
      texturePaths: {
        path: string;
        originalHeight: number;
        position?: 'bottom' | 'middle';
      }[],
    ) => {
      const backgrounds: Matter.Body[] = [];

      texturePaths.forEach((texture) => {
        const backgroundImage = new Image();
        backgroundImage.src = texture.path;

        backgroundImage.onload = () => {
          // 비율 유지하면서 높이 계산
          const backgroundWidth = width; // 컨테이너의 너비와 동일
          const scale = backgroundWidth / backgroundImage.width;
          const backgroundHeight = texture.originalHeight * scale;

          // Y 좌표 설정 (position에 따라 다르게 설정)
          let y;
          if (texture.position === 'middle') {
            y = height / 2; // 화면의 중간
          } else {
            y = height - backgroundHeight / 2; // 기본값: 화면 하단
          }

          // X 좌표는 중앙에 고정
          const x = backgroundWidth / 2;

          // 충돌하지 않는 Body 생성
          const backgroundBody = Matter.Bodies.rectangle(
            x,
            y,
            backgroundWidth,
            backgroundHeight,
            {
              isStatic: true,
              render: {
                sprite: {
                  texture: texture.path, // 이미지 경로
                  xScale: scale,
                  yScale: scale,
                },
              },
              collisionFilter: {
                group: -1, // 그룹 분리
                mask: 0x0000, // 충돌 비활성화
              },
            },
          );

          // 물리 세계에 추가
          Matter.World.add(engine.world, backgroundBody);
          backgrounds.push(backgroundBody);
        };
      });

      return backgrounds;
    };

    // 돌 추가
    const addRocks = (
      engine: Matter.Engine,
      width: number,
      height: number,
      texturePaths: {
        src: string;
        originalWidth: number;
        originalHeight: number;
      }[],
    ) => {
      // 최대 돌의 개수를 5개로 제한
      const maxRocks = 5;
      const rockCount = Math.min(maxRocks, Math.floor(width / 100)); // 최소 크기 100px로 조정

      const rocks: Matter.Body[] = [];

      for (let i = 0; i < rockCount; i++) {
        const rock = texturePaths[i % texturePaths.length]; // 이미지 반복 사용
        const rockImage = new Image();
        rockImage.src = rock.src;

        rockImage.onload = () => {
          // 각 돌의 너비는 컨테이너 너비를 돌 개수로 나눈 값
          const rockWidth = width / rockCount;
          const scale = rockWidth / rock.originalWidth + 0.05; // 비율 유지
          const rockHeight = rock.originalHeight * scale - 10;

          // 돌의 x 좌표는 왼쪽부터 순차적으로 배치
          const x = rockWidth * i + rockWidth / 2; // 돌의 중심 위치
          const y = height - rockHeight / 2; // 바닥에 배치

          const rockBody = Matter.Bodies.rectangle(
            x,
            y,
            rockWidth,
            rockHeight,
            {
              isStatic: true,
              restitution: 0.5,
              render: {
                sprite: {
                  texture: rock.src,
                  xScale: scale,
                  yScale: scale,
                },
              },
            },
          );

          rocks.push(rockBody);
          Matter.World.add(engine.world, rockBody);
        };
      }

      return rocks;
    };

    // 바다생물 추가
    const addSeafoods = (
      engine: Matter.Engine,
      width: number,
      height: number,
      seafoods: SeafoodCollected[],
    ) => {
      seafoods.forEach((seafood) => {
        const seafoodImage = new Image();
        seafoodImage.src = `${IMAGE_PATHS.SEAFOOD}/${seafood.englishName}.svg`;

        seafoodImage.onload = () => {
          for (let i = 0; i < seafood.count; i++) {
            const body = Matter.Bodies.circle(
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
            Matter.World.add(engine.world, body);
          }
        };
      });
    };

    // 다이버 추가 함수
    const addDiver = (
      engine: Matter.Engine,
      width: number,
      height: number,
      texturePath: string,
    ) => {
      const diverImage = new Image();
      diverImage.src = texturePath;

      diverImage.onload = () => {
        const diverBody = Matter.Bodies.rectangle(
          width / 2,
          height / 2,
          50,
          100,
          {
            isStatic: false,
            render: {
              sprite: { texture: diverImage.src, xScale: 0.2, yScale: 0.2 },
            },
            collisionFilter: { category: 0x0002, mask: 0x0000 },
          },
        );

        Matter.World.add(engine.world, diverBody);

        // 수직 방향 움직임 설정
        let direction = 1;
        const minY = height / 2;
        const maxY = height / 2 + 5;

        Matter.Events.on(engine, 'beforeUpdate', () => {
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
    };

    // 3. 동작 제어 (윈도우 리사이즈, 속도 제한)
    const updateSize = () => {
      const { width: newWidth, height: newHeight } =
        container.getBoundingClientRect();

      // @ts-expect-error MatterJS 타입이 잘못되어 있어서 발생하는 에러
      Matter.Render.setSize(render, newWidth, newHeight);

      World.remove(engine.world, [topWall, leftWall, rightWall, bottomWall]);

      topWall = Bodies.rectangle(newWidth / 2, 0, newWidth, 20, {
        isStatic: true,
        render: { visible: false },
      });
      leftWall = Bodies.rectangle(0, newHeight / 2, 20, newHeight, {
        isStatic: true,
        render: { visible: false },
      });
      rightWall = Bodies.rectangle(newWidth, newHeight / 2, 20, newHeight, {
        isStatic: true,
        render: { visible: false },
      });
      bottomWall = Bodies.rectangle(newWidth / 2, newHeight, newWidth, 20, {
        isStatic: true,
        render: { visible: false },
      });

      World.add(engine.world, [topWall, leftWall, rightWall, bottomWall]);
      width = newWidth;
      height = newHeight;
    };

    window.addEventListener('resize', updateSize);

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
    // 4. 유저 인터랙션
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;
    const mouse = Mouse.create(render.canvas);
    mouse.pixelRatio = pixelRatio;

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
      collisionFilter: { mask: 0x0001 },
    });

    World.add(engine.world, mouseConstraint);

    // 5. 정리 및 리소스 해제
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
    addBackgroundLayers(engine, width, height, [
      {
        path: `${IMAGE_PATHS.AQUARIUM}/Background-04.png`,
        originalHeight: 600, // 임의 높이 (예시)
        position: 'middle', // 중간에 위치
      },
      {
        path: `${IMAGE_PATHS.AQUARIUM}/Background-02.png`,
        originalHeight: 745,
        position: 'bottom', // 기본값: 하단
      },
      {
        path: `${IMAGE_PATHS.AQUARIUM}/Background-03.png`,
        originalHeight: 799,
        position: 'bottom', // 기본값: 하단
      },
    ]);

    addRocks(engine, width, height, [
      {
        src: `${IMAGE_PATHS.AQUARIUM}/rock-01.png`,
        originalWidth: 1234,
        originalHeight: 918,
      },

      {
        src: `${IMAGE_PATHS.AQUARIUM}/rock-03.png`,
        originalWidth: 1729,
        originalHeight: 517,
      },
      {
        src: `${IMAGE_PATHS.AQUARIUM}/rock-02.png`,
        originalWidth: 1342,
        originalHeight: 883,
      },
    ]);
    addDiver(engine, width, height, `${IMAGE_PATHS.AQUARIUM}/sumbi.png`);
    addSeafoods(engine, width, height, seafoods);

    return () => {
      window.removeEventListener('resize', updateSize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(engine.world, true);
    };
  }, [containerRef, canvasRef, seafoods]);
};
