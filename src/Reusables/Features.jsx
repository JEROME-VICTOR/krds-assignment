import React, { useState, useEffect } from 'react'
import '../scss/features.scss'
import '../scss/responsive.scss'
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "black" }}
        onClick={onClick}
      />
    );
}
  
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "inline-block", background: "black" }}
        onClick={onClick}
      />
    );
}

export default function Features({screen}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get('https://krds-assignment.github.io/aoc/api-assets/data.json')
        .then(response => {
            setData(response.data)
        }, [])
        .catch(error => console.error(error));
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    const FeaturesContainer = ({item, index}) => {
        return (
            <div className='features-conatiner'>
                <div className="features">
                    <img className="logo" src={item.logo} alt="Logo" />
                    <p className="title border">{item.title}</p>
                    <p className="description uppercase">{item.desc}</p>
                </div>
                <div className={`image-container image-container-${index+1}`}>
                <img className="image" src={item.image} alt="Phone" />
                </div>
            </div>
        )
    }

    return (
        (screen == 'large') ? (
            <div className={`feature-container ${screen}-container`}>
            {data.logo && (
                <div className="main-logo">
                    <img src={data.logo} alt="Main Logo" />
                </div>
            )}
            {data.features && data.features.map((item, index) => (
                <div className={`flex-box color${index + 1}`}>
                    <FeaturesContainer item={item} index={index}/>
                </div>
            ))}
        </div>
        )
        :
        (            
            <div className={`slider-container feature-container ${screen}-container`}>
                <Slider {...settings}>
                        {data.features && data.features.map((item, index) => (
                            <div className='card'>
                                <div className={`flex-box color${index + 1}`}>
                                    {index == 0 && data.logo && (
                                        <div className="main-logo">
                                            <img src={data.logo} alt="Main Logo" />
                                        </div>
                                    )}
                                    <FeaturesContainer item={item} index={index}/>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        )
    )
}
