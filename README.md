# PeaNutter

안녕하세요,
웹 표준과 접근성에 초점을 맞추어 사용자 친화적인 인터페이스 구축을 지향하는 woodstock입니다🫡

최상의 사용자 경험을 위해 디테일에 대해 끊임없이 고민하고 연구합니다.

<br>

![image](https://github.com/Stilllee/nwitter/assets/108785772/89db38e6-4d9e-4d65-914e-248d7a99ffd8)
<br>

좋아하는 만화 *Peanuts*를 테마로 한 소셜미디어 **PeaNutter**를 소개합니다.

Peanuts는 땅콩을 가리키는 단어로, '별 볼 일 없는 것들'이라는 의미로도 쓰입니다.
이 의미에서 착안하여 **PeaNutter**라는 이름을 붙였으며, 누구나 자신의 소소한 일상의 이야기나 생각, 감정 등을 가볍게 나누는 공간을 상징합니다.

**PeaNutter**에서는 사용자가 자신의 생각이나 일상의 순간들을 'nut'으로 게시하고, 서로간의 'nut'을 공유하여 의견을 나눌 수 있으며, 친구들과 관심 있는 사람들의 'nuts'를 타임라인에서 간편하게 확인하고 소통할 수 있습니다.

<br>

## 목차
- [기술 스택](#기술-스택)
- [주요 기능](#주요-기능)
<br>

## 기술 스택
### Front-end:
- **Vite**: 빠른 모듈 번들링 및 핫 리로딩을 제공하는 현대적인 프론트엔드 빌드 도구
- **React**: 사용자 인터페이스를 구축하기 위한 컴포넌트 기반의 웹 애플리케이션 프레임워크
- **TypeScript**: JavaScript에 타입 안전성을 추가하여 코드의 안정성 및 유지보성 향상
- **styled-components**: JavaScript로 CSS를 작성하여 컴포넌트 기반 스타일 관리
- **react-icons**: 다양한 아이콘 패키지를 쉽게 사용할 수 있도록 하는 React 컴포넌트 라이브러리
  
### Back-end:
- **Firebase**: 데이터베이스, 인증, 호스팅 등을 포함하는 서버리스 백엔드 솔루션

<br>

## 주요 기능
### 1. 반응형 레이아웃
![image](https://github.com/Stilllee/nwitter/assets/108785772/39977a64-7f5a-47d2-a8f4-0494f67cf1ef)
반응형 레이아웃을 통해 사용자는 모바일, 태블릿, 데스크탑 등 다양한 화면에서 원활한 사용자 경험을 얻을 수 있습니다.
<br>

### 2. 게시물 관리
![게시글 업로드](https://github.com/Stilllee/nwitter/assets/108785772/b901bc5c-8926-4938-b064-6d3155dc0fff)
타임라인에 실시간으로 게시물 추가 및 삭제가 반영됩니다.
<br>

![게시글 업로드2](https://github.com/Stilllee/nwitter/assets/108785772/934a52fa-5a50-49ea-86d8-438e47fada0c)
업로드는 타임라인과 사이드메뉴에서 모두 가능합니다.
- 사이드메뉴에서 게시하기를 누르면 모달창이 활성화 되며, 타임라인에 있는 업로드 기능과 동일하게 동작합니다.
<br>

![프로필 페이지](https://github.com/Stilllee/nwitter/assets/108785772/e511c3af-ff95-4973-aab3-7f9c22a09cf3)
게시글 작성자의 구분이 가능합니다.
- 프로필 페이지에서 접속한 유저가 작성한 게시글만 따로 볼 수 있습니다.
<br>

![게시글 삭제](https://github.com/Stilllee/nwitter/assets/108785772/93f460c6-4c7c-4dbf-979c-875df7e40c40)
- 타임라인에서는 모든 게시물이 보여지며, 타인의 게시물은 삭제할 수 없고 접속한 유저의 게시물만 삭제할 수 있습니다.
<br>
 
### 3. 계정 관리
![protected routes](https://github.com/Stilllee/nwitter/assets/108785772/a534e440-f45c-4ee2-a4dc-01506a35c31a)
'Protected Routes' 방식으로 로그인되지 않은 사용자의 접근을 랜딩페이지로 제한헙나다.
- 로그인되지 않은 유저는 가입 및 로그인에 관련된 기능만을 이용할 수 있습니다.
<br>

![로그아웃](https://github.com/Stilllee/nwitter/assets/108785772/5c354343-0e86-437e-bd85-3104d66ba66b)
- 유저 로그아웃시에는 랜딩페이지로 넘어갑니다.
