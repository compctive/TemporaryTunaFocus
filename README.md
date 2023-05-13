# TemporaryTunaFocus
+ Tampermonkey 확장프로그램 기반 어장 유저 스크립트입니다.
+ 어장의 한 스레드에서 특정 아이디나 코드의 레스만을 확인할 수 있게 해줍니다.
+ 전체 보기 상태(.../trace.php/board/1234567890, 맨 뒤에 /recent 붙어있으면 안됨)에서만 작동하니 참고하세요.
----
+ 없는 닉네임이나 아이디 입력하면 오류창이 뜬 뒤 모든 레스가 사라지는 버그가 있습니다. 새로고침 하면 다시 나타납니다.
+ 업데이트/유지보수 어려움… JS를 잘 안다면 포크하거나 해서 자유롭게 수정해서 사용하시기 바랍니다.

## 사용법
+ Tampermonkey를 설치합니다.
+ Tampermonkey 대시보드 > 도구 > Import from URL에 
 + https://raw.githubusercontent.com/compctive/TemporaryTunaFocus/main/TemporaryTunaFocus.js
 + 를 넣거나 새 유저 스크립트에 해당 링크 내용을 복붙합니다.
 + 제목 옆에 레스 버튼을 눌러 원하는 아이디나 코드를 입력하고 확인을 누릅니다.
 + 모든 레스를 다시 보고 싶다면 전부보기 버튼을 누릅니다.
