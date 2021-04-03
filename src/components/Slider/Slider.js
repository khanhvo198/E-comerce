import {useState} from 'react'
import { CarouselCaption, CarouselItem, Carousel, CarouselIndicators, CarouselControl } from 'reactstrap';

const items = [
    {
      id: 1,
      altText: 'Slide 1',
      caption: 'Slide 1'
    },
    {
      id: 2,
      altText: 'Slide 2',
      caption: 'Slide 2'
    },
    {
      id: 3,
      altText: 'Slide 3',
      caption: 'Slide 3'
    }
];

const Slider = () => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [animating,setAnimating] = useState(false)

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if(animating) return;
        const previousIndex = activeIndex === 0 ? items.length - 1 : activeIndex -1
        setActiveIndex(previousIndex)
    }

    const goToIndex = (newIndex) => {
        if(animating) return;
        setActiveIndex(newIndex)
    }

    const slides = items.map(item => {
        return (
            <CarouselItem 
            className="custom-tag"
            tag="div"
            key={item.id}
            onExiting={()=>setAnimating(true)}
            onExited={()=>setAnimating(false)}
            >
                <img className="slider__image" alt="This is example slider" src="https://www.anphatpc.com.vn/media/news/0812_wp4676574-4k-pc-wallpapers.jpg" />

                <CarouselCaption captionText={item.caption} />
            </CarouselItem>
        )

    })


    return (
        <div className="slider">
            <style>
                {
                    `.custom-tag {
                    max-width: 100%;
                    height: 390px;
                    }
                    .slider__image {
                        height: 100%;
                    }
                    `
                }
            </style>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    )


}

export default Slider