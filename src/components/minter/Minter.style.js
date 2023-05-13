import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const BannerStyleWrapper = styled.section`
  width: 100%;
  background-size: cover;
  height: 100%;
  object-fit: cover;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 0px 0px;
  display: flex;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column;

  h1,
  h4,
  h5 {
    margin: 0;
  }

  .reactive-btn {
    vertical-align: inherit !important;
  }

  .reactive-btn.secondary.shadow {
    box-shadow: 0px 0px 50px 0px #faad14 !important;
  }

  /* particles and banner thumb */
  .banner-image-area3 {
    position: relative;
    padding: 110px 0;
    z-index: 3;

    .banner-image1 {
      position: relative;
      z-index: 3;
      top: -25px;
    }

    .banner-image2,
    .banner-image3 {
      position: absolute;
    }
    .banner-image2 {
      left: -52px;
      bottom: 40px;
    }
    .banner-image3 {
      right: 75px;
      bottom: 130px;
      z-index: 4;
    }

    /* particles */
    .shape_1,
    .shape_2,
    .shape_3 {
      position: absolute;
    }
    .shape_1 {
      top: 15%;
      width: 72px;
    }

    .shape_2 {
      top: 22%;
      left: 68%;
      width: 40px;
    }

    .shape_3 {
      top: 76%;
      left: 40%;
      width: 64px;
    }

    .rotated-style {
      animation: ${rotate} 30s linear infinite;
    }
  }

  .banner-conent3 {
    .banner-subtitle {
      color: #fff;
      font-size: 24px;
      margin-bottom: 20px;
      z-index: 5;
    }

    .banner-title {
      align-text: center;
      position: relative;
      color: #ffffff;
      font-size: 60px;
      font-family: Poppins, san-serif;
      font-weight: 600;
      line-height: 80px;
      margin-bottom: 30px;
      z-index: 8;
    }

    span {
      color: white;
    }
  }

  .mint_timer {
    width: 50vw;
    z-index: 8 !important;

    h5 {
      font-size: 18px;
      color: #fff;
    }

    .timer_1 {
      z-index: 8 !important;
      display: block;
      margin-bottom: 40px;
    }
  }

  .banner-count-inner {
    display: flex !important;
    justify-content: center !important;

    .banner-btn-area {
      margin-right: 30px;
    }

    .input-number,
    .input-number-decrement,
    .input-number-increment {
      border: none;
      height: 60px;
      user-select: none;
    }

    .input-number-decrement,
    .input-number-increment {
      display: inline-block;
      width: 60px;
      color: #fff;
      text-align: center;
      font-weight: bold;
      line-height: 60px;
      background: rgba(255, 255, 255, 0.06);
      cursor: pointer;
    }

    .input-number {
      color: #fff;
      background: transparent;
      border-right: none;
      border-top: 2px solid rgba(255, 255, 255, 0.06);
      border-bottom: 2px solid rgba(255, 255, 255, 0.06);
      width: 80px;
      padding: 0 12px;
      vertical-align: top;
      text-align: center;
      outline: none;
    }

    .input-number-increment {
      border-left: none;
    }
  }
  .banner-bottom-text {
    color: rgba(255, 255, 255, 0.8);
    font-size: 18px;
    font-family: "Rubik", sans-serif;
    // max-width: 240px;
    // margin-top: 52px;
    line-height: 1.5;
    z-index: 5;
  }

  .banner-bottom-text-bold {
    color: rgba(255, 255, 255, 0.8);
    font-size: 24px;
    font-family: "Rubik", sans-serif;
    // max-width: 240px;
    // margin-top: 52px;
    line-height: 1.5;
    z-index: 5;
  }

  /* timer */
  .root-react-component-countdown-timer {
    z-index: 5 !important;
    line-height: 65px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;

    .split {
      color: rgba(255, 255, 255, 0.2);
    }
    .countBox {
      font-family: "Rubik", sans-serif;
      font-size: 40px !important;
      display: flex;
      justify-content: flex-end;
      flex-direction: row-reverse;
      column-gap: 10px;
      span {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    .banner-conent3 {
      // .banner-title {
      //   position: relative;
      //   font-family: Poppins, san-serif;
      //   font-size: 90px;
      //   line-height: 70px;
      //   z-index: 8;
      // }
    }
    .banner-image-area3 {
      .banner-image2 {
        left: 0;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    .bithu_v3_baner_sect {
      padding-bottom: 80px;
    }

    .banner-image-area3 {
      padding-top: 20px;

      .banner-image1 {
        left: 80px;
      }
    }
  }

  // This is mobile screen //
  @media only screen and (max-width: 1000px) {
    .banner-conent3 {
      .banner-subtitle {
        font-size: 20px;
        margin-bottom: 15px;
        z-index: 5;
      }
      .banner-title {
        position: relative;
        font-size: 45px;
        font-family: Poppins, san-serif;
        line-height: 55px;
        margin-bottom: 30px !important;
        z-index: 8;
      }
    }

    .durationName {
      font-size: 12px !important;
    }

    .banner-bottom-text {
      color: rgba(255, 255, 255, 0.8);
      font-size: 18px;
      font-family: "Rubik", sans-serif;
      // max-width: 240px;
      // margin-top: 52px;
      line-height: 1.5;
      z-index: 5;
    }

    .banner-bottom-text-bold {
      color: rgba(255, 255, 255, 0.8);
      font-size: 18px;
      font-family: "Rubik", sans-serif;
      // max-width: 240px;
      // margin-top: 52px;
      line-height: 1.5;
      z-index: 5;
    }

    .banner-image-area3 {
      .banner-image2 {
        display: none;
      }
    }
  }

  @media only screen and (max-width: 480px) {
    .banner-title {
      font-size: 36px !important;
      line-height: 48px !important;
      margin-top: 15px !important;
      margin-bottom: 6px !important;
    }

    .banner-image-area3 {
      .banner-image1 {
        left: 0;
      }
      .banner-image3 {
        right: 0;
      }
    }

    .banner-count-inner {
      &.d-flex {
        display: flex !important;
        justify-content: center !important;
      }

      .banner-btn-area {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
`;

export default BannerStyleWrapper;
