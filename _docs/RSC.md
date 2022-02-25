# React Server Component

제대로 분석해봅시다.

프론트엔드 세계는 정말 많은 변화를 가지고, 트렌드가 변합니다.

그 중에서 중심이 되어 움직이는 것이 data fetching과 redering입니다.

최근에는 화면 내에 필요한 부분에서만 hydration하여 사용자 경험을 극대화하는 Nextjs와 같은 프레임워크가 인기를 얻고 있습니다. 이렇게 되면 CSR의 이점과 SSR의 이점을 각각 가지고 사용자에게 웹 서비스를 제공할 수 있습니다.

하지만 이런 구조 또한 완전하지 않고 단점 또한 명확하게 존재합니다. 이 시기가 저는 새로운 큰 변화의 격변기라고 생각됩니다. 과도기 이기도 하며 많은 사람들이 관심있어 하는 트렌드가 되었습니다.

그러던 중 React@18과 함께 등장한 React Server Component는 개발자들의 관심을 끌기 충분 했습니다.

곧 정식 릴리즈를 기다리고 있는 이 시점에 저는 이 React Server Component의 동작방식을 이해함으로써 더 넓은 React 세계, 프론트엔드 세계를 이해해보려고 합니다.

## RSC, SSR, CSR

React Server Component와 Server Side Rendering(이하 SSR or SSG)는 별도로 생각해보는 것이 좋습니다.
