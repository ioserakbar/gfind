import { faEye, faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Col, NavItem, Row } from 'reactstrap';


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
      activeIndex: 0,
      activeSrc: ''
    };
  }

  openSrcModal(e) {
    alert(e.target.src);
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
    const prevIndex = this.state.activeIndex === 0 ? this.props.multimedia.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: prevIndex });
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

        slides = this.state.multimedia.map((multimedia) => {
          if (multimedia.extention === 'mp4' || multimedia.extention === 'mkv') {
            return (
              <CarouselItem
                className="publication-carousel"
                tag="div"
                key={multimedia.name}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                 <FontAwesomeIcon icon={faPlayCircle} />
                <video src={multimedia.path} onClick={(e) => this.props.srcCallback(true, e.target.src, 'video')} />
              </CarouselItem>
            );
          } else {
            return (
              <CarouselItem
                className="publication-carousel"
                tag="div"
                key={multimedia.name}
                onExiting={this.onExiting}
                onExited={this.onExited}
              >
                <img src={multimedia.path} alt={multimedia.name} onClick={(e) => this.props.srcCallback(true, e.target.src, 'image')} />
              </CarouselItem>
            );
          }
        });


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
                      interval={false}
                      next={this.next}
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
                      interval={false}
                      next={this.next}
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
                        <FontAwesomeIcon icon={faPlayCircle} />
                        <video src={this.state.multimedia[0].path} onClick={(e) => this.props.srcCallback(true, e.target.src, 'video')} />
                      </>
                    ) : (
                      <>
                        <img src={this.state.multimedia[0].path} alt={this.state.multimedia[0].name} onClick={(e) => this.props.srcCallback(true, e.target.src, 'image')} />
                      </>
                    )}
                  </Col>
                </>
              ) : (
                <>
                  <Col md={6} className='publication-multimedia'>
                    {this.state.multimedia[0].extention === 'mp4' ? (
                      <>
                        <FontAwesomeIcon icon={faPlayCircle} />
                        <video src={this.state.multimedia[0].path} onClick={(e) => this.props.srcCallback(true, e.target.src, 'video')} />
                      </>
                    ) : (
                      <>
                        <img src={this.state.multimedia[0].path} alt={this.state.multimedia[0].name} onClick={(e) => this.props.srcCallback(true, e.target.src, 'image')} />
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


