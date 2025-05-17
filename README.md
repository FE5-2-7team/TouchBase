# ⚾️ KBO 팬 커뮤니티 TouchBase

![touch-base](https://github-production-user-asset-6210df.s3.amazonaws.com/54721624/444752304-5bd17289-3b6f-40eb-81d6-c2949fb8d9d2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20250517%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250517T063058Z&X-Amz-Expires=300&X-Amz-Signature=fe497a68367e05d54a7f786b7d1055f609f17a6f4e27ee69a32764d46bd5c4cf&X-Amz-SignedHeaders=host)

- 배포 URL : https://kdt-touch-base.netlify.app
- Test ID : test@email.com
- Test PW : qwer1234

<br>

## 프로젝트 소개

- TouchBase 는 야구를 좋아하는 국내 팬들의 소통 창구로 활용할 수 있는 SNS 서비스입니다.
- 개인의 프로필에서 구단을 선택하여 응원하는 팀을 고르고 자유롭게 글을 쓸 수 있습니다.
- 응원하는 팀이 없더라도 글을 작성할 수 있습니다.
- 검색을 통해 사용자, 게시글로 소통을 이어 나갈 수 있습니다.
- 다양한 사용자들을 팔로우하며 마음에 드는 게시글에 '좋아요'를 누르거나 댓글을 작성할 수 있습니다.
- 다양한 사용자들과 DM을 주고받으며 소통을 이어 나갈 수 있습니다.

<br>

## 팀원 구성

<div align="center">

|                                                          **박상윤**                                                          |                                                              **김보민**                                                               |                                                               **이준호**                                                                |                                                               **정지유**                                                               |                                                                 **최연서**                                                                 |
| :--------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| [<img src="https://avatars.githubusercontent.com/u/54721624?v=4" height=150 width=150> <br/> @SK](https://github.com/ygvbhy) | [<img src="https://avatars.githubusercontent.com/u/153171193?v=4" height=150 width=150> <br/> @marchbom](https://github.com/marchbom) | [<img src="https://avatars.githubusercontent.com/u/116176572?v=4" height=150 width=150> <br/> @JUNHORANG](https://github.com/JUNHORANG) | [<img src="https://avatars.githubusercontent.com/u/86185120?v=4" height=150 width=150> <br/> @JINJIYU23](https://github.com/JINJIYU23) | [<img src="https://avatars.githubusercontent.com/u/86912810?v=4" height=150 width=150> <br/> @CHOIYEONSEO](https://github.com/CHOIYEONSEO) |

</div>

<br>

## 1. 개발 환경

- Front : React, TypeScript, Vite
- Back-end : 제공된 API 활용
- 버전 및 이슈관리 : Github, Notion
- 협업 툴 : Notion, Slack
- 서비스 배포 환경 : Netlify
- 디자인: [Figma](https://www.figma.com/design/IMrKyF3XKanKq0Dpm7Wq4N/touchbase?node-id=0-1&t=PoqnuSdtkT8dzggD-1)
- [커밋 컨벤션](https://github.com/FE5-2-7team/TouchBase/wiki/%EC%BD%94%EB%93%9C-%EC%BB%A8%EB%B2%A4%EC%85%98)

<br>

## 2. 폴더 구조

```plaintext
src
├── api
│   ├── auth.ts
│   └── axiosInstance.ts
├── App.tsx
├── assets
│   ├── fonts
│   └── images
├── components
│   ├── Auth
│   ├── FanPage
│   ├── Header
│   ├── Icons
│   ├── Main
│   ├── Message
│   └── Profile
├── css
│   ├── global.css
│   ├── index.css
│   └── tailwind.css
├── hooks
│   └── useDarkMode.ts
├── layout
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ProfileLayout.tsx
│   ├── RejectIfAuth.tsx
│   ├── RequireAuth.tsx
│   └── RootLayout.tsx
├── main.tsx
├── pages
│   ├── DetailFanPage.tsx
│   ├── EditProfilePage.tsx
│   ├── FanPage.tsx
│   ├── HomePage.tsx
│   ├── LogInPage.tsx
│   ├── MessagePage.tsx
│   ├── NotFoundPage.tsx
│   └── SignUpPage.tsx
├── stores
│   ├── channelStore.ts
│   ├── messageStore.ts
│   ├── newAndHotPostStore.ts
│   ├── refreshStore.ts
│   └── userStore.ts
├── swiper.d.ts
├── types
│   ├── mainGame.ts
│   ├── messageType.ts
│   ├── postType.ts
│   └── userTypes.ts
├── utils
│   ├── getLogoImages.ts
│   └── parsePost.ts
└── vite-env.d.ts
```

## 3. 역할 분담

### 👨‍💼 박상윤

- **UI**
  - 페이지: 홈 페이지
- **기능**
  - 로그인 기능, 유저 정보 저장, 접근제한 설정
- **ETC**
  - 팀장

<br>

### 👩‍💻 김보민

- **UI**
  - 페이지 : 메시지 함, 메시지 보내기, 헤더, 검색창, 알림창
- **기능**
  - 알림 리스트 출력, 메시지 리스트 출력, 유저/게시글 검색, 메시지 보내기,
- **디자인**
  - Figma를 활용한 메시지함, 검색 모달 디자인 시안 제작

<br>

### 👨‍💻 이준호

- **UI**
  - 페이지 : 로그인 페이지, 회원가입 페이지, 회원 정보 수정 페이지, 404 페이지
- **기능**
  - 회원가입 유효성, 닉네임 중복 검사, 이메일 검증, 비밀번호 검증, 프로필 설정
- **디자인**
  - Figma를 활용한 프로젝트 페이지 디자인 기획 및 시안 제작

<br>

### 👩‍💻 최연서

- **UI**
  - 페이지 : 사용자 프로필 페이지
- **기능**
  - 팔로우 및 언팔로우, 게시글 수정 및 삭제 기능,
- **ETC**
  - 발표 자료 제작 및 최종 발표 진행

<br>

### 👩‍💻 정지유

- **UI**
  - 팬 페이지
- **기능**
  - 게시글 작성 기능, 최신순/인기순 정렬 기능
- **디자인**
  - Figma를 활용한 프로젝트 페이지 디자인 기획 및 시안 제작

<br>

## 4. 개발 기간

### 개발 기간

- 전체 개발 기간 : 2025.04.24 ~ 2025.05.19
- UI 구현 : 2025.05.01 ~ 2025.05.06
- 기능 구현 : 2025.05.08 ~ 2025.05.19

<br>

## 5. 페이지 별 기능

## 6. 트러블 슈팅

## 7. 프로젝트 후기
