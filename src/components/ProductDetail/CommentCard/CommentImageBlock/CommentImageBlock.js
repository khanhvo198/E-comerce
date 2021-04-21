import 'components/ProductDetail/CommentCard/CommentImageBlock/CommentImageBlock.scss';
import $ from 'jquery';
import { useState } from 'react';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';


CommentImageBlock.defaultProps = {
    imageList: [],
    interval: 1000,
}

function CommentImageBlock(props) {
    const { imageList, interval } = props;
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [visible, setVisible] = useState(false)

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === imageList.length - 1 ? 0 : activeIndex + 1
        indexChangeAnimation(nextIndex)
        setActiveIndex(nextIndex)
    }

    const previous = () => {
        if (animating) return;
        const previousIndex = activeIndex === 0 ? imageList.length - 1 : activeIndex - 1
        indexChangeAnimation(previousIndex)
        setActiveIndex(previousIndex)
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        indexChangeAnimation(newIndex)
        setActiveIndex(newIndex)
    }

    const slides = imageList.map((src, index) => {
        return (
            <CarouselItem
                className="custom-tag"
                tag="div"
                key={index}
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
            >
                <img className="image-slider__image" src={src} />
            </CarouselItem>
        )
    })

    const indexChangeAnimation = (newIndex) => {
        if (animating) return;
        if ((newIndex === activeIndex && !visible) || (newIndex != activeIndex)) {
            setVisible(true)
        }
        if (newIndex === activeIndex && visible) {
            setVisible(false)
        }
    }

    const border = (index) => {
        return `${index === activeIndex && visible ? "1px solid red" : "none"}`
    }


    return (
        <div>
            <div className='image-list'>
                {imageList.map((src, index) => (
                    <div key={index} style={{ border: border(index) }} onClick={() => goToIndex(index)} ><img src={src} /></div>
                ))}
            </div>
            {visible
                ? <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                    interval={interval}
                    className='image-slider'
                >
                    <CarouselIndicators items={imageList} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                : null
            }
        </div >
    )


}

export default CommentImageBlock