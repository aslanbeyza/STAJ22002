/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-slick' {
    import * as React from 'react';
  
    interface SliderProps {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      arrows?: boolean;
      [key: string]: any;
    }
  
    export default class Slider extends React.Component<SliderProps> {}
  }
  