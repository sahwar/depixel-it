//@flow

/*
** Imports
*/

import React from 'react';
import { Line } from 'rc-progress';
import styled from 'styled-components';
import DropArea from '../DropArea';
//$FlowFixMe
import Worker from 'worker-loader!../../worker/ImageProcessor.js';
import Graph from '../../lib/Graph';
import StepView from '../StepView';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';

/*
** Types
*/

export type StateTypes = {
  imageData: any,
  progress: ?number,
  progression: ?{
    title: string,
    percent: number,
    complete: boolean
  },
  processedImage: any,
  steps: Array<{
    type: string,
    g?: Graph,
    image?: any
  }>
};

/*
** Styled
*/

const StepViewWidth = 815;
const StepViewHeight = 815;

const Page = styled.div`
  display: block;
  width: 1200px;
  text-align: center;
  margin: auto;
  font-family: Verdana, Geneva, sans-serif;
`;

const Panel = styled.div`
  display: inline-block;
  text-align: center;
  border: 1px solid #cecece;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
`;

const DropPanel = Panel.extend`
  width: 300px;
  height: 340px;
`;

const ContentPanel = Panel.extend`
  width: ${StepViewWidth}px;
  height: ${StepViewHeight}px;
  vertical-align: top;
`;

const StepViewWrapper = styled(StepView)`
  display: block;
  width: ${StepViewWidth}px;
  height: ${StepViewHeight}px;
  text-align: center;
`;

const ProgressArea = styled.div`
  width: ${StepViewWidth}px;
  height: ${StepViewHeight}px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #f0f0f0;
`;

const ProgressDescription = styled.p`
  display: block;
  color: #3e3e3e;
  font-style: italic;
`;

const SaveDropdown = styled(Dropdown)`
  float: right;
`;

const Canvas = styled.canvas`
  display: none;
`;

/*
** Component
*/

class MainPage extends React.Component<{}, StateTypes> {
  state = {
    imageData: null,
    progress: null,
    progression: null,
    processedImage: null,
    steps: [],
    initialGraph: null,
    reshapedGraph: null
  };

  worker = new Worker();
  canvas = null;
  dropdownOptions = [
    {
      title: 'PNG x4',
      handler: () => {
        console.log('save as png x4');
      }
    },
    {
      title: 'PNG x8',
      handler: () => {
        console.log('save as png x8');
      }
    },
    {
      title: 'SVG',
      handler: () => {
        console.log('save as svg');
      }
    }
  ];

  onImageLoaded = (image: Object) => {
    this.setState(prevState => ({
      ...prevState,
      imageData: image,
      steps: [],
      progress: null
    }));
  };

  processImage = () => {
    const { imageData } = this.state;
    const canvas = this.canvas;

    if (canvas && imageData) {
      const ctx = canvas.getContext('2d');
      const width = imageData.width;
      const height = imageData.height;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(imageData, 0, 0, width, height);
      const canvasData = ctx.getImageData(0, 0, width, height);

      this.setState(prevState => ({
        ...prevState,
        progression: null
      }));

      this.worker.postMessage({
        width,
        height,
        data: canvasData.data
      });
    } else {
      console.error(`Unable to retrieve context.`);
    }
  };

  onWorkerMessage = (e: any) => {
    const msg = e.data;
    const { imageData } = this.state;

    console.log('on message');
    console.log(msg);
    if (msg) {
      switch (msg.type) {
        case 'progress':
          this.setState(prevState => ({
            ...prevState,
            progression: msg.data
          }));
          break;
        case 'step':
          const stepType = msg.data.type;

          if (stepType === 'initial' && imageData) {
            const g = Graph.unserialize(msg.data.graph);

            this.setState(prevState => ({
              ...prevState,
              steps: [...prevState.steps, { type: stepType, g: g }]
            }));
          } else if (stepType === 'reshaped' && imageData) {
            const g = Graph.unserialize(msg.data.graph);

            this.setState(prevState => ({
              ...prevState,
              steps: [...prevState.steps, { type: stepType, g: g }]
            }));
          } else if (stepType === 'final' && imageData) {
            const canvas = this.canvas;

            if (canvas) {
              const ctx = canvas.getContext('2d');
              const d = new ImageData(msg.data.image, imageData.width, imageData.height);

              ctx.putImageData(d, 0, 0);

              this.setState(prevState => ({
                ...prevState,
                steps: [...prevState.steps, { type: stepType, image: canvas.toDataURL() }]
              }));
            }
          }
          break;
        default:
      }
    }
  };

  componentDidMount() {
    this.worker.addEventListener('message', this.onWorkerMessage);
  }

  renderContent() {
    const { imageData, steps, progression } = this.state;

    console.log(progression);
    if (imageData) {
      if (progression) {
        if (progression.complete) {
          return (
            <StepViewWrapper width={StepViewWidth} height={StepViewHeight} steps={progression.complete ? steps : []}>
              {progression && progression.complete ? (
                <SaveDropdown items={this.dropdownOptions}>Save-as</SaveDropdown>
              ) : null}
            </StepViewWrapper>
          );
        } else {
          return (
            <ProgressArea>
              <Line percent={12} height={12} width={StepViewWidth - 50} />
              <ProgressDescription>{progression.title}</ProgressDescription>
            </ProgressArea>
          );
        }
      } else {
        return (
          <ProgressArea>
            <ProgressDescription>Press the magic button !</ProgressDescription>
            <Button blue onClick={this.processImage}>
              Depixel-it !
            </Button>
          </ProgressArea>
        );
      }
    } else {
      return (
        <ProgressArea>
          <ProgressDescription>Please load an image to see the result</ProgressDescription>
        </ProgressArea>
      );
    }
  }

  render() {
    const { imageData } = this.state;

    return (
      <Page>
        <Header />
        <DropPanel>
          <DropArea onImageLoaded={this.onImageLoaded} />
          <Button blue disabled={!imageData} onClick={this.processImage}>
            Depixel-it !
          </Button>
        </DropPanel>
        <ContentPanel>{this.renderContent()}</ContentPanel>
        <Canvas innerRef={e => (this.canvas = e)} />
      </Page>
    );
  }
}

export default MainPage;
