
# 스프링 부트를 활용한 기상 알림 문자 서비스

## 📆개발 기간
2024 06.24 ~ 2024 07.02

## 💻사용언어
- <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/>
- <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/>
- <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/>
- <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white">

## 📟라이브러리, 프레임워크
- <img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white">
- <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
- <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white">
- <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white"/>
- <img src="https://img.shields.io/badge/jQuery-0769AD?style=flat-square&logo=jQuery&logoColor=white"/>
- <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>
- <img src="https://img.shields.io/badge/Thymeleaf-C6EBBE?style=for-the-badge&logoColor=white">
- <img src="https://img.shields.io/badge/Ajax-4FB0C6?style=for-the-badge&logoColor=white">
- <img src="https://img.shields.io/badge/JPA-686868?style=for-the-badge&logoColor=white">
- <img src="https://img.shields.io/badge/mariaDB-003545?style=for-the-badge&logo=mariaDB&logoColor=white"> 
- <img src="https://img.shields.io/badge/HeidiSQL-DFD9E2?style=for-the-badge&logoColor=white">
- <img src="https://img.shields.io/badge/Lombok-E4D9FF?style=for-the-badge&logoColor=white">
- <img src="https://img.shields.io/badge/JSON-000000?style=flat-square&logo=json&logoColor=white"/>

## ⌨사용 툴
- ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)
- ![Notion](https://img.shields.io/badge/Notion-white?style=flat-square&logo=Notion&logoColor=000000)
- ![IntelliJ_IDEA](https://img.shields.io/badge/IntelliJ_IDEA-789AFE?style=flat-square&logo=IntelliJ%20IDEA&logoColor=white)

## ⚙프로젝트 구성
![KakaoTalk_20240701_174214117](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/e366faf4-23c9-4419-a7a1-547e28484eb0)


## 💾프로젝트 프로그램 사용법
프로젝트 내에 API 사용법:

1. apikey.js 파일 추가
const config {
   // API Key 추가
};

export default config;

2. application-API-KEY.properties 파일 추가
message-api-key = API Key 추가
message-secret-api-key = API Key 추가

![여기어때 drawio](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/3709527e-5489-4259-a41c-c156e834e882)

## 🔍구현 결과
![구현결과 drawio](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/059af82c-ddee-4ebd-ad51-186e9e77d6d0)

## 📃관련문서
- PDF : [악바리_실시간 기상 알림 시스템.pdf](https://github.com/user-attachments/files/16094569/_.pdf)
- Notion : https://apple-decision-c91.notion.site/60f57cf64f6c483ab7c6e7da55d48cb9?v=dd1b4df13b8f4d899aaac2324082e3aa 

## 🔒저작권 및 사용권 정보
- 카카오 지도 api : https://apis.map.kakao.com/
- 카카오 로그인 api : https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api
- 기상청 단기예보 api : https://www.data.go.kr/data/15084084/openapi.do
- 미세먼지 api : https://api-docs.iqair.com/
- coolsms 문자 api : https://coolsms.co.kr/
- 뉴스 api : https://newsdata.io/

## 👨‍🦱프로그래머 정보

- 장소현(https://github.com/thgus0526)
- 임정빈(https://github.com/jbn750)
- 한상민([mmm44112@gmail.com](https://github.com/mmm44112?tab=repositories))
- 유성헌(https://github.com/c21ysh2)
- 변성진([byun970@gmail.com](https://github.com/byun970))

## 🖼화면

### 메인 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/48065140-c527-48b2-b665-aef212763db0)
- 카테고리(퀴즈, 뉴스, 문의사항 등...) 메인 화면.
- 좌측 지도에 마커를 찍으면 우측화면에 날씨정보와 미세먼지 정보 출력.
- 사용자의 위치를 받아 화면에 날씨정보 출력.
- 회원정보에 주소를 받아 화면에 날씨정보 출력.

### 로그인 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/0d45e362-f036-4a2a-89e9-5a65c0965cc0)
- 소셜 로그인과 일반로그인을 통해 사용자 정보 수집.
- 아이디 및 비밀번호 찾기.

### 회원가입 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/c25701f3-f80b-462f-996d-cabd3bab209a)
- 유효성 검사를 통한 아이디, 비밀번호, 이메일 중복 검사.
- gps이용을 위한 주소 입력.
- 이메일 중복을 방지하기 위한 인증코드 발송.

### 카카오 소셜 로그인 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/824b1656-ef6c-40c4-a93c-6e99f36e1417)
- 동의항목 체크로 사용자 정보 수집
#### 카카오 소셜 로그인 개인정보 수집 후 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/3cc4704e-bbea-4c51-affe-2a1b1ac43bb4)
- 추가 적인 개인정보를 받기위한 간편가입 페이지 이동.

### 소셜 및 로그인 후 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/dc3733f2-2649-4c5b-be0d-50b39d59f35a)
- 사용자의 주소를 불러서 지도에 위치정보 및 날씨 정보 출력.
- 헤더에 사용자 ID 출력 및 클릭시 마이페이지로 이동.

### 문의 사항 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/e5bd50e2-1657-4329-a3b2-2914bea4a646)
- 사용자의 문의를 등록하는 페이지/ 수정 삭제 가능.
- 관리자 권한을 가진 사용자만 답글 가능.

### 공지 사항 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/52be94b7-e0cc-4121-bd90-9037fb1e3d6a)
- 관리자의 공지사항 등록 페이지
- 수정 삭제 가능.

### 환경 퀴즈 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/5e6681d7-ebe9-42d6-b187-839da9f99853)
- ox퀴즈 페이지
- 하단에 사용자의 정보 출력
- 다음 문제 풀기 버튼을 누르면 새로운 문제 생성

![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/ec5ffc4b-c4ac-4763-840d-78370775508d)

![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/32bf16e1-3ac6-4bd4-9593-fc1f3138957e)
- 정답을 맞추면 '정답입니다' 오답이면 '오답입니다' 모달창 생성

### 환경 뉴스 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/de8c4da9-f53f-4834-9821-1a1be554471b)
- 뉴스 api를 받아 환경 뉴스 출력
- 뉴스 카테고리를 url

### 마이 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/e499f6e1-161f-4c06-a7c9-f4a35b958928)
- 이메일 인증을 통한 회원정보 수정 기능
- 비밀번호 인증을 통한 비밀번호 변경
- 비밀번호 인증을 통한 회원 탈퇴 기능
- 포인트 전환 기능
- 알람 설정 변경 기능
- 우편번호 찾기를 통한 주소 변경

### 회원 관리 페이지
![image](https://github.com/thgus0526/Ezen_Spring_Boot_Project/assets/76036655/b1c31cf4-9bee-4356-9c1c-f5e33498da4c)
- 관리자가 회원 정보 수정 / 삭제 가능
- 사용자는 접근 불가능
## 🎬시연영상
Youtube : https://youtu.be/75pfmZPCna0?si=7SMnvZXMadJvY65Y 
