import { useState } from 'react'
import { CarouselCaption, CarouselItem, Carousel, CarouselIndicators, CarouselControl } from 'reactstrap';
import 'components/ProductDetail/CommentCard/CommentImageBlock/CommentImageBlock.scss';
import $ from 'jquery';
import reducer from 'feature/Cart/CartSlice';


CommentImageBlock.defaultProps = {
    imageList: [],
    interval: 1000,
}

function CommentImageBlock(props) {
    const { imageList, interval } = props;
    const [activeIndex, setActiveIndex] = useState(0)
    const [animating, setAnimating] = useState(false)

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
                <img className="image-slide" src={src} />
            </CarouselItem>
        )

    })

    const indexChangeAnimation = (newIndex) => {
        if (animating) return;
        $('.image-list div').css('border', 'none')
        const isVisible = $('.carousel').is(':visible')
        if ((newIndex === activeIndex && !isVisible) || (newIndex != activeIndex)) {
            $('.carousel').show()
            $(`#image-list-${newIndex}`).css('border', '1px solid red')
        }
        if (newIndex === activeIndex && isVisible) {
            $('.carousel').hide()
        }
    }


    return (
        <div>
            <div className='image-list'>
                {imageList.map((src, index) => (
                    <div key={index} id={`image-list-${index}`}><img src={src} onClick={() => goToIndex(index)} /></div>
                ))}
            </div>
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
                interval={interval}
                className='carousel'
            >
                <CarouselIndicators items={imageList} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div >
    )


}

export default CommentImageBlock