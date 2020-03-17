import React, { PureComponent } from 'react';
import TestResultDetailsItem from './TestResultDetailsItem';
import l18n from './translations';
import db from './data';

class TestResultDetails extends PureComponent {
  render() {
    let i = this.props.item;

    if (i) return (
      <span className={this.props.noHighlight ? "centerColumn noHighlight" : "centerColumn"}>

        <TestResultDetailsItem 
          selectedTest={this.props.selectedTest}
          test={db.dictionaries.ST_FLT}
          testName={l18n.result_FS}
          unit={l18n.gflops}
          result={i[db.dictionaries.ST_FLT]}
        />

        <TestResultDetailsItem 
          selectedTest={this.props.selectedTest}
          test={db.dictionaries.MT_FLT}
          testName={l18n.result_FM}
          unit={l18n.gflops}
          result={i[db.dictionaries.MT_FLT]}
        />

        <TestResultDetailsItem 
          selectedTest={this.props.selectedTest}
          test={db.dictionaries.ST_INT}
          testName={l18n.result_IS}
          unit={l18n.ginops}
          result={i[db.dictionaries.ST_INT]}
        />

        <TestResultDetailsItem 
          selectedTest={this.props.selectedTest}
          test={db.dictionaries.MT_INT}
          testName={l18n.result_IM}
          unit={l18n.ginops}
          result={i[db.dictionaries.MT_INT]}
        />        

      </span>);

      return null;
  }
}

export default TestResultDetails;