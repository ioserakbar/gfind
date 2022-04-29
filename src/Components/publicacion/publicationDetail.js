import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, NavItem, Row } from 'reactstrap';


export class PublicationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.state = {
      status: true,
      multimedia: [],
      content: "",
      activeIndex: 0
    };
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === this.props.multimedia.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? this.props.multimedia.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  async componentDidMount() {

    if (this.props.content || this.state.multimedia) {
      await this.setState({
        status: true,
        multimedia: this.props.multimedia,
        content: this.props.content
      });
      console.log(this.state.content, this.state.multimedia);
      this.forceUpdate();
    }

  }

  render() {
    const multimediaSize = this.state.multimedia.length;

    let hasMultipleMultimedia = false;
    let hasImage = false;
    let onlyMultimedia = false;
    var slides;

    if (multimediaSize > 0) {
      hasImage = true;
      if (this.state.content === '') {
        onlyMultimedia = true;
      }
      if (multimediaSize === 1) {
        hasMultipleMultimedia = false;
      } else {
        hasMultipleMultimedia = true;
        if (this.state.multimedia.extention === 'mp4' || this.state.multimedia.extention === 'mkv') {
          slides = this.state.multimedia.map((multimedia) => {
            return (
              <CarouselItem
                className="custom-tag"
                tag="div"
                key={multimedia.name}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <video src={multimedia.path} />
                <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
              </CarouselItem>
            );
          });
        } else {
          slides = this.state.multimedia.map((multimedia) => {
            return (
              <CarouselItem
                className="custom-tag"
                tag="div"
                key={multimedia.name}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
                <img src={multimedia.path} alt={multimedia.name} />
              </CarouselItem>
            );
          });
        }

      }

    }
    const { activeIndex } = this.state;


    return (
      this.state.status ? (
        <Row className='card-body-row'>
          {
            hasImage && hasMultipleMultimedia ? (

              onlyMultimedia ? (
                <>
                  <Col className='publication-multimedia-alone'>
                    <Carousel
                      activeIndex={activeIndex}
                      next={this.next}
                      interval={false}
                      previous={this.previous}
                    >
                      <CarouselIndicators items={this.props.multimedia} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                      {slides}
                      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} className='publication-multimedia'>
                    <Carousel
                      activeIndex={activeIndex}
                      next={this.next}
                      interval={false}
                      previous={this.previous}
                    >
                      <CarouselIndicators items={this.props.multimedia} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                      {slides}
                      <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                      <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                    </Carousel>
                  </Col>
                  <Col md={6} className='publication-description-image'>
                    {this.props.content}
                  </Col>
                </>
              )
            ) : hasImage ? (
              onlyMultimedia ? (
                <>
                  <Col className='publication-multimedia-alone'>
                    {this.state.multimedia[0].extention === 'mp4' ? (
                      <>
                        <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
                        <video src={this.state.multimedia[0].path} />
                      </>

                    ) : (
                      <>
                        <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
                        <img src={this.state.multimedia[0].path} alt={this.state.multimedia[0].name} />
                      </>
                    )}
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} className='publication-multimedia'>
                    {this.state.multimedia[0].extention === 'mp4' ? (
                      <>
                        <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
                        <video src={this.state.multimedia[0].path} />
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faEye} className='multimedia-closer' />
                        <img src={this.state.multimedia[0].path} alt={this.state.multimedia[0].name} />
                      </>
                    )}
                  </Col>
                  <Col md={6} className='publication-description-image'>
                    {this.props.content}
                  </Col>
                </>
              )
            ) : (
              <>
                <Col md={6} className='publication-description-image'>
                  {this.props.content}
                </Col>
              </>
            )
          }
        </Row>
      ) : (
        <div>placeholder</div>
      )
    );
  }

}


