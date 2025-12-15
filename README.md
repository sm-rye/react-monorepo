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
