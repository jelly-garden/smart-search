# 강화 BI 사업 차번검색 프로젝트

Webpack template for a React app with TypeScript and ESLint

# 기본 환경 설정(.env)

    src/.env 파일에서 필요에 따라 아래 사항 변경

    # app setting
    REACT_APP_TITLE=강화 BI 사업 차번검색 프로젝트 # 브라우저 탭에 표현되는 app title
    REACT_APP_URL=/smart-search/app/ # app base url
    REACT_APP_PORT=3000 # 로컬 구동 시 port
    REACT_APP_MODE=development # development or production
    
    # layout setting
    REACT_APP_HEADER=true # 레이아웃 헤더 표시 유무
    REACT_APP_SIDE_BAR=true # 레이아웃 좌측 Side Bar 표시 유무
    REACT_APP_SIDE_BAR_HEADER=true # 레이아웃 좌측 Side Bar 헤더 표시 유무
    REACT_APP_SIDE_BAR_FOOTER=true # 레이아웃 좌측 Side Bar 푸터 표시 유무
    REACT_APP_SIDE_BAR_FIXED=true # 레이아웃 좌측 Side Bar 너비 고정 여부
    
    # button function setting
    REACT_APP_COLLAPSED=true # 헤더 좌측 상단, 사이드바 toggle 버튼 표시 유무
    REACT_APP_TRANSLATE=true # 헤더 우측 상단, 다국어 스위치 표시 유뮤
    REACT_APP_USER_PROFILE=true # 헤더 우측 상단, 유저 프로필(drow down) 아이콘 표시 유무
    REACT_APP_CURRENT_DATE=true # 헤더 우측 상단, 현재 시간 표시 유무
    REACT_APP_THEME=true # 사이드바 하단 테마 아이콘 표시 유무


# 주요패키지

-   react
    -   v17.0.2 적용
-   redux-toolkit
    -   redux 툴킷 라이브러리
-   redux-persist
    -   store state 초기화 방지, local / session storage 저장 기능 라이브러리
-   react-icon
    -   각종 오픈소스 SVG 아이콘 사용가능
-   eslint
    -   typescript/react 에 맞춘 설정(prettier 함께 사용)
-   webpack
    -   react-scripts 를 사용하지 않고 직접 적용
    -   esbuild-loader 적용
-   formik & yup
    -   form 태그 유효성 검증 라이브러리
-   moment
    -   date 데이터 컨트롤 라이브러리
-   react-tabulator
    -   tabulator data table 라이브러리
    -   http://tabulator.info/examples/5.4 참고
-   i18next
    -   다국어 처리 라이브러리
-   react-pro-sidebar
    -   collapsed 사이드 네비게이션 바 라이브러리

# 테마 추가 관련

src/styles/ThemeDark.ts & ThemeLight.ts 파일 내 테마 관련 기능 추가 시

-   테마 파일 내 스타일 key 추가
-   src/types/styled.d.ts 파일 내 동일한 스타일 key definition 추가 해야함

# 주의 사항

Node 14v 이상 사용

# 프로젝트 폴더 구조

```bash
📦client
 ┣ 📂.vscode                               # vscode Tool 설정 디렉토리
 ┃ ┣ 📜extensions.json
 ┃ ┣ 📜launch.json
 ┃ ┗ 📜settings.json
 ┣ 📂node_modules                          # node_modules, 설치 패키지 모음
 ┣ 📂public                                # React Static File
 ┃ ┣ 📜favicon.ico
 ┃ ┗ 📜index.html
 ┣ 📂src                                   # 개발 소스
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts                             # font file(경량화 NotoSans) 모음
 ┃ ┃ ┃ ┣ 📜LICENSE_OFL.txt
 ┃ ┃ ┃ ┣ 📜NotoSansKR-Black.otf
 ┃ ┃ ┃ ┣ 📜....
 ┃ ┃ ┗ 📂images                            # 프로젝트 내 사용 이미지 파일 모음 (로고, 아이콘 등)
 ┃ ┃ ┃ ┣ 📜dark-group-user.png
 ┃ ┃ ┃ ┣ 📜....
 ┃ ┣ 📂i18n                                # 다국어 설정 디렉토리
 ┃ ┃ ┣ 📜i18n.tsx                              # 다국어 설정 정의 파일
 ┃ ┃ ┣ 📜translation.en.json                   # 다국어 영문
 ┃ ┃ ┗ 📜translation.ko.json                   # 다국어 한글
 ┃ ┣ 📂services                            # 서비스 디렉토리
 ┃ ┃ ┣ 📂api                                   # restApi 호출 관련 http 통신 관련, api 디렉토리 하위로 서비스 별 구분
 ┃ ┃ ┃ ┣ 📂dhsUserManager                          # 사용자 관리 API 정의 디렉토리
 ┃ ┃ ┃ ┃ ┣ 📜DhsUserManagerApi.ts                      # dhs-user-manager 객체 및 API 인터페이스 정의 파일
 ┃ ┃ ┃ ┃ ┣ 📜DhsUserManagerHttp.ts                     # dhs-user-manager http 통신 정의 파일
 ┃ ┃ ┃ ┃ ┗ 📜DhsUserManagerInterface.ts                # dhs-user-manager 통신 데이터 인터페이스 정의 파일
 ┃ ┃ ┃ ┗ 📜HttpService.ts                      # 프로젝트 공용 HTTP 함수 정의
 ┃ ┃ ┣ 📂store                             # redux 관련, store 디렉토리 하위로 타입 및 기능 별 구분
 ┃ ┃ ┃ ┣ 📂common                              # [공용] redux slice 정의 디렉토리
 ┃ ┃ ┃ ┃ ┗ 📜common-slice.ts
 ┃ ┃ ┃ ┣ 📜hooks.tsx                           # useDispatch / useSelector custom hook 정의 파일
 ┃ ┃ ┃ ┗ 📜index.ts                            # store 정의 파일, redux 설정 및 persist(redux 데이터 유지 관련) 설정
 ┃ ┃ ┗ 📂utils                             # 유틸성 파일 모음 (상수, 공통 함수 등) 디렉토리
 ┃ ┃ ┃ ┣ 📜constant.ts                         # 상수로 쓰이는 변수 정의 파일
 ┃ ┃ ┃ ┣ 📜functions.tsx                       # 공용 함수 정의 파일(파일, 인코딩, validation 등등)
 ┃ ┃ ┃ ┣ 📜index.ts                            # 📂utils 하위 파일, export 관리 파일
 ┃ ┃ ┃ ┗ 📜types.ts                            # 전역으로 관리하는 공통 타입 정의 파일
 ┃ ┣ 📂styles                              # 스타일 정의 디렉토리
 ┃ ┃ ┣ 📜GlobalFonts.ts                        # font-face 스타일 설정 파일
 ┃ ┃ ┣ 📜GlobalOverrideStyle.ts                # 외부 라이브러리 오버라이딩 Global 스타일 관리 파일
 ┃ ┃ ┣ 📜GlobalStyle.ts                        # 전역 공통 스타일 설정 파일
 ┃ ┃ ┣ 📜index.ts                              # 📂styles 하위 파일, export 관리 파일
 ┃ ┃ ┣ 📜ThemeDark.ts                          # 다크 테마 설정 파일
 ┃ ┃ ┗ 📜ThemeLight.ts                         # 라이트 테마 설정 파일
 ┃ ┣ 📂types                               # type definition 정의 디렉토리
 ┃ ┃ ┣ 📜env.d.tsx                             # 환경변수 definition type 정의 파일
 ┃ ┃ ┣ 📜fonts.d.ts                            # font 파일 definition type 정의 파일
 ┃ ┃ ┣ 📜images.d.ts                           # Image 파일 definition type 정의 파일
 ┃ ┃ ┗ 📜styled.d.ts                           # styled-components 테마 처리 관련 definition type 정의 파일
 ┃ ┣ 📂views                               # views(컴포넌트 및 화면 파일) 소스 디렉토리
 ┃ ┃ ┣ 📂components                            # 컴포넌트 모음 (메뉴 별 구분)
 ┃ ┃ ┃ ┣ 📂common                                  # [공통] 컴포넌트 모음
 ┃ ┃ ┃ ┃ ┣ 📜BreadCrumb.tsx                            # 사이트 이동경로 (Breadcrumb navigation)
 ┃ ┃ ┃ ┃ ┣ 📜CurrentDate.tsx                           # 현재 시간 표시 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜FileUploadInput.tsx                       # 파일 업로드 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜index.tsx                                 # 📂common 하위 파일, export 관리 파일
 ┃ ┃ ┃ ┃ ┣ 📜LoadingSpinner.tsx                        # 로딩 스피너
 ┃ ┃ ┃ ┃ ┣ 📜MenuConstant.tsx                          # 메뉴 데이터
 ┃ ┃ ┃ ┃ ┣ 📜PageTitle.tsx                             # 페이지 상단 타이틀 표시 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜ProSideBar.tsx                            # Side Bar 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜SubSideBar.tsx                            # 서브 Side Bar 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜TableLoading.tsx                          # 테이블 내 로딩 스피너 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜TableRowCount.tsx                         # 테이블 열 개수 컴포넌트
 ┃ ┃ ┃ ┃ ┣ 📜ToggleSwitch.tsx                          # 다국어 on/off 스위치 컴포넌트
 ┃ ┃ ┃ ┃ ┗ 📜UserProfile.tsx                           # 유저 프로필(drop down) 표시 컴포넌트
 ┃ ┃ ┣ 📂layouts                           # views(컴포넌트 및 화면 파일)을 감싸는 화면 레이아웃 소스 디렉토리
 ┃ ┃ ┃ ┣ 📜Aside.tsx                           # Aside(사이드) 레이아웃 부모 컴포넌트
 ┃ ┃ ┃ ┣ 📜Content.tsx                         # content(본문) 레이아웃 부모 컴포넌트
 ┃ ┃ ┃ ┣ 📜ContentLayout.tsx                   # content(본문)를 감싸는 부모 content 레이아웃 부모 컴포넌트
 ┃ ┃ ┃ ┣ 📜Header.tsx                          # header(상단 헤더) 레이아웃 부모 컴포넌트
 ┃ ┃ ┃ ┣ 📜index.ts                            # layouts export 관리
 ┃ ┃ ┃ ┗ 📜Layout.tsx                          # 모든 레이아웃을 포괄하는 부모 컴포넌트
 ┃ ┃ ┗ 📂pages                             # 페이지(URL을 통해 들어오는 진입 컴포넌트) 컴포넌트 모음
 ┃ ┣ 📜app.tsx                        # React App 컴포넌트
 ┃ ┣ 📜index.tsx                      # React 진입점 index.tsx 파일
 ┃ ┗ 📜service-worker.ts              # 서비스워커 파일 현재 사용 X
 ┣ 📜.dockerignore              # docker 빌드 시, 불필요 파일 제거 설정
 ┣ 📜.editorconfig              # editor 툴 설정 파일
 ┣ 📜.env                       # 환경 변수 파일
 ┣ 📜.eslintrc.json             # eslint 설정 파일
 ┣ 📜.gitignore                 # git push 시, 불필요 파일 제거 설정
 ┣ 📜.prettierignore            # prettier(코드 스타일 정리) 무시 파일 설정
 ┣ 📜.prettierrc                # prettier 설정
 ┣ 📜package-lock.json
 ┣ 📜package.json               # 패키지 정보
 ┣ 📜PROJECT.md                 # 프로젝트 구조 설명 markdown 파일
 ┣ 📜README.markdown            # 프로젝트 기본 설명 markdown 파일
 ┣ 📜tsconfig.json              # 타입스크립트 설정 파일
 ┣ 📜webpack.dev.config.tsx     # 개발용 webpack 설정 파일
 ┗ 📜webpack.prod.config.tsx    # 배포용 webpack 설정 파일
```
