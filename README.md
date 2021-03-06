# Vending Machine 개발하기.

## 1. 화면 구성

- 상품 전시 영역
- 금전 투입 영역
- 콘솔 영역





## 2. 각 영역별 스펙분석 

### 2-1. 상품 전시 영역

> 상품들이 전시되고, 사용자가 상품을 클릭하여 물건을 구매하는 영역.

- 상품은 페이지가 로드될 때 8종이 랜덤으로 진열(새로고침 할 때마다 랜덤하게 진열이 재구성).
- 같은 상품의 중복 X.
- 상품의 가격은 100원 ~ 800원.
- 화면에는 표시하지 않지만, 각 상품에는 재고가 있음. 수량은 임의로 정하고, 그 수량이 모두 __소진(품절)__되었을 때는, 상품 구매가 불가능. "품절되었다"는 상황묘사의 방식은 본인 재량.
- 재고 또한 페이지를 새로고침 할 때마다 랜덤하게 변함. 단, 최소수량 1개, 최대수량 3개.
- 상품의 사진 또는 가격을 클릭하면 __구매__.





### 2-2. 금전 투입 영역

> 동전/지폐의 투입, 반환, *떨어뜨림* 이 발생하는 영역.  

- 동전/지폐 투입구, 반환 버튼이 존재.
- 사용자가 돈을 투입구에 드롭하면 돈을 __투입__한 것이 됨.
- 돈을 투입하면, 투입구에 현재 얼마가 들어갔는지 표시됨. 자판기에 최대 투입할 수 있는 돈은 3,000원이고, 지폐는 최대 2장까지, 그리고 동전은 제한없이 투입가능.
- 상품을 구매한 경우, 투입구에 표시된 금액은 내가 넣은 금액에서 해당 상품의 금액이 차감된 금액으로 바뀌어야 함.
- __반환__ 버튼을 누르면, 투입구에 표시된 금액이 내 주머니로 반환됨.





### 2-3. 콘솔 영역

> 모든 행동에 대한 기록을 출력하는 영역.

- 상품 전시 영역, 금전 투입 영역, 그리고 사용자 영역에서 발생하는 모든 행동에 대한 기록을 출력.
  - 행동리스트
    - 상품 전시 영역: 구매, 금액 부족, 품절, 꺼낼 수 있는 곳에 상품 등장(?)
    - 금전 투입 영역: 돈 투입, 돈 반환, 돈 최대 투입한도 경고, 지폐 투입한도 경고
    - 사용자 영역: 돈 꺼냄, 돈을 주머니에 다시 넣음, 돈 떨굼
- 콘솔 내용은 스크롤이 가능하도록 함.
- 가장 최근에 발생한 행동이 최하단에 기록되고, 스크롤도 그에따라 밑으로 이동.




### 2-4. 사용자 영역

> 돈(동전/지폐)을 꺼내는 행위가 발생하는 영역.

- 내 주머니에 들어있는 돈은 10,000원. 
- 주머니 안의 돈은 동전과 지폐의 구분이 없음. 꺼내는 대로 지폐가 되기도, 동전이 되기도함. 이때, "꺼낸다"는 표현은 우측의 동전 또는 지폐 버튼을 클릭해서 드래그하는 것을 말함.
- 드래그한 돈을 실수로 투입구 바깥 영역에 드롭하는 경우, __떨어뜨린__ 돈으로 간주가 되어, 투입구에 표시된 금액은 올라가지 않고, 내 주머니에선 그만큼 차감이 됨. 떨어뜨린 돈은 다시 주울 수 없음.



## 궁금한점

- "상품의 가격은 100원 ~ 800원"
  - ~~*상품과 가격 매칭도 랜덤하게 하나요?* *아니면 새로고침 때마다 진열만 랜덤하게 하나요?*~~
    - 진열만 랜덤하게 하자.
- "상품은 페이지가 로드될 때 8종이 랜덤으로 진열됩니다."
  - ~~*상품 8종은 fix에 진열되는 순서만 랜덤한거죠?*~~
    - 네
- 화면 예시 관련
  - ~~화면 UI는 제공된 예시에서 어느 정도의 수정은 가능한가요?~~
    - 네
- 준수 사항 관련
  - ~~컨벤션, 정적 코드 검사 url 체크~~
  - *TDD로 하나요?*
- 지원 브라우저
  - 최신 브라우저



## 3. 개발 계획

### 3.1 프로젝트 구조

- Vendingmachine
  - Product
  - MoneyInOut
  - Record
  - User



*~~고민1. User를 Vendingmachine의 일부로 넣을지, 따로 존재하게 할지 여부~~*



#### 3.1.1 클래스 별 프로퍼티 및 메서드

- ProductDisplay

  - Product
    - 프로퍼티
      - id
      - name
      - enName(영어이름)
      - price
      - amount
      - productFigure(상품을 담은 마크업요소)
      - productStateTextContainer(상품의 상태(구매가능/돈부족/품절)를 표시할 마크업요소)
    - 메서드
      - onclick: 상품
        - checkSoldOut
        - purchase
        - showProductState
        - warnShortOfMoney

- MoneyInOut
  - 프로퍼티
    - moneyPutArea
    - moneyBackButton
    - totalInsertedMoneySpan
    - totalInsertedMoneyTextContainer
    - totalInsertedMoney
    - MONEY_LIMIT
    - BILL_LIMIT
    - currentBillCount
  - 메서드
    - ondrop: 투입구
      - checkLimit
      - acceptMoney
      - refuseMoney
      - checkEnoughMoney
      - deductTotalInsertedMoney
    - onclick: 반환 버튼
      - returnMoney

- Record
  - 프로퍼티
    - recordHeader
    - recordListContainer
  - 메서드
    - makeACTIONRecord
    - showRecord
    - goScrollToBottom

  *~~고민2. {행동: 메시지}를 프로퍼티로 가질지 여부~~*

- User

  - 프로퍼티
    - name
    - myMoney
    - purchasedProduct
    - moneyButtonList(50원, 100원, 500원, 1000원 버튼을 담은 요소들을 갖고있는 객체)
    - myMoneyTextContainer(money를 담고있는 요소)
    - myMoneySpan
  - 메서드
    - ondrag
      - takeoutMoney
    - checkUserMoney
    - showPurchasedProduct

*투입구가 아닌 영역에 ondrop이벤트 발생시 loseMoney 트리거*

### 3.2 기술 스택 

- ES5 Vanilla JS
- ~~Webpack~~
- 단위 테스트: Mocha + Chai
- ~~정적 코드 검사: eslint-config-naver기반~~



