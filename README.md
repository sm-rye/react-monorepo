# react-monorepo 프로젝트 설치 및 실행 가이드 (README 용)

이 프로젝트는 Yarn Workspaces를 활용하여 여러 서브 프로젝트를 관리하는 모노레포(Monorepo) 구조로 구성되어 있습니다.

📋 필수 요구 사항 (Prerequisites)

Node.js: v16 이상 (Corepack 사용 권장)
Yarn: v4.12.0 이상

🛠️ 설치 및 준비 과정

1. Corepack 활성화
   corepack enable
   corepack prepare yarn@4.12.0 --activate

2. 종속성 설치
   모노레포의 루트 디렉토리에서 한 번의 명령어로 모든 워크스페이스(서브 프로젝트)의 종속성을 설치합니다.
   yarn install

3. 프로젝트 실행
   yarn dev:프로젝트명

💡 주의: Workspaces를 사용하므로, 각 서브 폴더에 들어가서 개별적으로 yarn install을 실행할 필요가 없습니다. 모든 의존성은 루트의 node_modules에서 관리됩니다.

## 🆕 새 프로젝트 생성

`_template`(Vite + React + TypeScript + Tailwind)을 복사해 새 워크스페이스를 자동으로 생성합니다.

```bash
yarn new <경로>
```

**경로 규칙**

| 유형 | 경로 형식 | 생성되는 패키지명 |
|------|----------|----------------|
| 강의 프로젝트 | `lectures/<강의명>/<프로젝트명>` | `@<강의명>/<프로젝트명>` |
| 개인 프로젝트 | `projects/<프로젝트명>` | `@project/<프로젝트명>` |

**예시**

```bash
yarn new lectures/dream-coding/my-app
# → @dream-coding/my-app 생성
# → 루트 package.json에 dev:my-app 스크립트 자동 추가

yarn new projects/side-project
# → @project/side-project 생성
# → 루트 package.json에 dev:side-project 스크립트 자동 추가
```

생성 후 바로 실행:

```bash
yarn dev:<프로젝트명>
```
