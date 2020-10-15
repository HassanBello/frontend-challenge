import { keyframes } from "styled-components";

export const fadeRight = keyframes`
0.0%{
  transform: translate(-20px, 0);
  opacity: 0;
}
25.0%{
  transform: translate(-20px, 0);
  opacity: 0;
}
49.8%{
  transform: translate(0, 0px);
  opacity: 0.5;
}
99.5%{
  transform: translate(0, 0px);
  opacity: 1;
}
`;

export const backDropFadeIn = keyframes`
0.0%{
  opacity: 0;
  bottom: 0;
  transform: translate(0);
}
100%{
  opacity: 1;
  bottom: 0;
  transform: translate(0);
}
49.5%{
  opacity: 0.5;
  bottom: 0;
  transform: translate(0);
}
`;

export const fadeDown = keyframes`
0.0%{
  transform: skew(22deg) translate(0, -50px);
  opacity: 0;
  top: 15px;
  bottom: 0;
}
24.6%{
  transform: translate(0, -50px);
  opacity: 0.25;
}
49.7%{
  transform: translate(0, 50px);
  opacity: 0.5;
}
99.5%{
  transform: skew(0) translate(0, 0);
  opacity: 1;
}
`;

export const fadeIn = keyframes`

0.0%{
  opacity: 0;
}
50.1%{
    opacity: 0.5;
  }
100%{
  opacity: 1;
}`;
