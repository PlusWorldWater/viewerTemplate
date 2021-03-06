import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Card from "./Card";

class LeftPanel extends React.Component {
  // given an section id, this function displays the secondary panel with that id
  showInfo = (sectionID) => {
    let SecondaryPanel = this.props.SecondaryPanel;
    SecondaryPanel.show =
      SecondaryPanel.show && SecondaryPanel.id === sectionID ? false : true;
    SecondaryPanel.id = sectionID;
    this.props.updateState(SecondaryPanel);
  };

  // function for expanding the section
  expandSection = (sectionID) => {
    let dataSections = [...this.props.sections];
    dataSections[sectionID].expanded = dataSections[sectionID].expanded
      ? false
      : true;
    this.props.updateState(dataSections);
  };

  // function for selecting a data set to be displayed on the map
  toggleDataset = (datasetID) => {
    let datasets = [].concat([...this.props.datasets]);
    datasets[datasetID].selected = datasets[datasetID].selected ? false : true;
    this.props.updateDatasets(datasets);

    let selectedDatasets = [...this.props.selectedDatasets];
    datasets[datasetID].selected
      ? selectedDatasets.push(datasetID)
      : selectedDatasets.splice(selectedDatasets.indexOf(datasetID), 1);
    this.props.updateSelectedDatasets(selectedDatasets);
  };

  // display the sections in the leftpanel
  makeCards = (dataSections) => {
    return dataSections.map((item) => {
      return (
        <Card
          item={item}
          key={item.id}
          datasets={this.props.datasets}
          charts={this.props.charts}
          click={() => this.showInfo(item.id)}
          expandSection={() => this.expandSection(item.id)}
          toggleDataset={this.toggleDataset}
        />
      );
    });
  };

  render() {
    return (
      <Container fluid={true} className="p-0 leftbar">
        <h1
          className=" p-2 font-weight-light color-white"
          style={{ borderBottom: "3px solid var(--highlight-color)" }}
        >
          Explore
        </h1>
        <Col className="p-0">{this.makeCards(this.props.sections)}</Col>
      </Container>
    );
  }
}

export default LeftPanel;
