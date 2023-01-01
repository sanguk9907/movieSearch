## 소개

TMDB라는 영화 정보 검색 사이트의 오픈소스 API를 활용하여 <br/>
개봉일, 평점, 줄거리, 비슷한 영화,상영중인 OTT서비스 등을 검색할 수 있는 반응형 홈페이지를 제작하였습니다.


## 사용한 기술

React / Node.js / Mysql

## 프로젝트 설명

[프로젝트 링크](http://52.196.233.251/)
<br/>
<br/>

### Header

로그인, 회원가입, 검색 , 로그아웃, 회원정보 등으로 구성되어 있으며,<br/>
가로 사이즈에 맞춰 반응형으로 제작되었습니다.

### Main

활용중인 TMDB 의 오픈소스 API에서 제공하는 가장 인기있는 5개의 영화를 슬라이드 이미지로 보여주며,<br/>
아래로는 넷플릭스, 디즈니플러스, 왓챠에서 가장 인기있는 20개의 영화와<br/>
현재 상영중인, 최고의 평가 20선을 슬라이드 형식으로 제작했습니다.

### MovieDetail

영화 이미지, 슬라이드의 자세히 보기 등을 클릭시 영화의 상세정보를 보여주는 모달창입니다.


### Search

영화 제목을 검색 할 수 있으며 인피니티 스크롤을 활용해 페이지 넘김 없이 볼 수 있도록 제작하였습니다.

### Join & Login

crypto모듈과 express-session을 사용해 안전하게 회원가입과 로그인을 할 수 있게 하였고<br/>
정규식을 사용해 정확한 회원 정보를 받을 수 있도록 하였습니다.

### Profile

로그인 시 회원 정보를 열람 할 수 있으며,<br/>
닉네임, 자기소개, 비밀번호 등을 변경 할 수 있고<br/>
회원 탈퇴가 가능합니다.
