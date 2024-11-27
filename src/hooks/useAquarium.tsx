import { useEffect } from 'react';
import Matter from 'matter-js';
import { SeafoodCollected } from '../api/home';

export const useAquarium = (
  containerRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  seafoods: SeafoodCollected[],
) => {
  useEffect(() => {
    // Matter.js의 주요 모듈 가져오기
    const Engine = Matter.Engine; // 물리 시뮬레이션 엔진
    const Render = Matter.Render; // 그래픽 렌더링 엔진
    const Runner = Matter.Runner; // 물리 엔진 실행 관리
    const World = Matter.World; // 모든 물체를 포함하는 월드
    const Bodies = Matter.Bodies; // 물리적 물체 생성
    const Mouse = Matter.Mouse; // 마우스 입력 처리
    const MouseConstraint = Matter.MouseConstraint; // 마우스와 물체의 상호작용
    const Events = Matter.Events; // 이벤트 관리

    // 1. 물리 엔진 및 렌더링 설정
    const engine = Engine.create(); // 엔진 생성
    engine.gravity.x = 0; // 수평 중력 설정
    engine.gravity.y = 0.1; // 수직 중력 설정

    const render = Render.create({
      element: containerRef.current!, // 렌더링을 적용할 HTML 컨테이너
      engine: engine, // 물리 엔진 연결
      canvas: canvasRef.current!, // 렌더링할 Canvas 지정
      options: {
        background: '/images/home_background.png', // 배경 이미지 설정
        wireframes: false, // 디버그용 와이어프레임 비활성화
      },
    });

    // 2. 해산물 물체 생성
    const spriteScale = 1; // 해산물 이미지 스케일 조정
    seafoods.forEach((seafood) => {
      const seafoodImage = new Image(); // 해산물 이미지를 로드
      seafoodImage.src = `/images/Seafoods/${seafood.englishName}.svg`;

      seafoodImage.onload = () => {
        for (let i = 0; i < seafood.count; i++) {
          // count만큼 해산물 물체 생성
          const body = Bodies.circle(
            Math.random() * 700 + 50, // X 좌표: 랜덤 초기 위치 (50 ~ 750)
            Math.random() * 500 + 50, // Y 좌표: 랜덤 초기 위치 (50 ~ 550)
            30, // 물체의 반지름
            {
              restitution: 0.3, // 바운스 효과 설정
              friction: 0.1, // 마찰력 설정
              render: {
                sprite: {
                  texture: seafoodImage.src, // 해산물 이미지 적용
                  xScale: spriteScale, // X축 스케일
                  yScale: spriteScale, // Y축 스케일
                },
              },
            },
          );
          World.add(engine.world, body); // 월드에 물체 추가
        }
      };
    });

    // 3. 다이버 물체 생성 및 애니메이션
    // 3. 다이버 물체 생성 및 애니메이션
    const diverImage = new Image(); // 다이버 이미지를 로드
    diverImage.src = '/images/diver.svg';

    diverImage.onload = () => {
      const diverBody = Bodies.rectangle(400, 300, 50, 100, {
        // 중앙에서 시작
        isStatic: false, // 움직임 가능
        render: {
          sprite: {
            texture: diverImage.src, // 다이버 이미지 적용
            xScale: 1.7, // X축 스케일
            yScale: 1.4, // Y축 스케일
          },
        },
        collisionFilter: {
          category: 0x0002,
          mask: 0x0000,
        },
      });

      World.add(engine.world, diverBody); // 월드에 다이버 추가

      let direction = 1; // 다이버의 움직임 방향 (1: 아래, -1: 위)

      // 매 프레임마다 다이버의 위치를 업데이트
      Events.on(engine, 'beforeUpdate', () => {
        const minY = 300; // 최소 Y 위치 (애니메이션 범위 상한)
        const maxY = 305; // 최대 Y 위치 (애니메이션 범위 하한)

        // 다이버의 Y 위치에 따라 방향 전환
        if (diverBody.position.y >= maxY) {
          direction = -1; // 위로 이동
        } else if (diverBody.position.y <= minY) {
          direction = 1; // 아래로 이동
        }

        // 방향에 따라 부드럽게 움직이는 힘 적용
        Matter.Body.applyForce(diverBody, diverBody.position, {
          x: 0,
          y: direction * 0.0008, // 미세한 힘 적용
        });
      });
    };

    // 4. 마우스 입력 처리
    const mouse = Mouse.create(render.canvas); // 마우스 생성
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2, // 드래그 시 탄성도
        render: { visible: false }, // 제약선 숨김
      },
      collisionFilter: {
        mask: 0x0001,
      },
    });

    World.add(engine.world, mouseConstraint); // 마우스 제약 추가

    // 5. 벽 생성
    World.add(engine.world, [
      // 투명한 상, 좌, 우 벽
      Bodies.rectangle(400, 0, 800, 20, {
        // 상단 벽
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(0, 300, 20, 600, {
        // 왼쪽 벽
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(800, 300, 20, 600, {
        // 오른쪽 벽
        isStatic: true,
        render: { visible: false },
      }),

      // 박스를 사용하여 울퉁불퉁한 바닥 구성
      Bodies.polygon(100, 550, 100, 150, {
        // 바닥에 큰 구조물
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.polygon(250, 580, 70, 120, {
        // 중간 크기
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.polygon(400, 580, 50, 80, {
        // 작은 구조물
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.polygon(550, 570, 70, 80, {
        // 중간 크기
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.polygon(700, 550, 100, 120, {
        // 바닥에 큰 구조물
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(400, 590, 800, 20, {
        // 바닥
        isStatic: true,
        render: { visible: false },
      }),
    ]);

    // 물체 속도 제한
    const bodies = engine.world.bodies;
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((body) => {
        const maxSpeed = 3; // 최대 속도
        const velocity = body.velocity;

        // 속도 제한
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

    // 5. 엔진 및 렌더러 실행
    const runner = Runner.create(); // 엔진 실행기 생성
    Runner.run(runner, engine); // 엔진 실행
    Render.run(render); // 렌더링 실행

    // 6. 정리 작업
    return () => {
      Render.stop(render); // 렌더링 중지
      Runner.stop(runner); // 엔진 실행 중지
      Engine.clear(engine); // 엔진 상태 초기화
    };
  }, [containerRef, canvasRef, seafoods]); // 의존성 배열
};
