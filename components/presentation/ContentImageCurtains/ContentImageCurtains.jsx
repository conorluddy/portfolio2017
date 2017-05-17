/*
  ContentImageCurtains
  Stateless Presentation Component

  Component description...

  To import this elsewhere (directory nesting level may vary):
  import ContentImageCurtains from '../../ContentImageCurtains/ContentImageCurtains.jsx';
*/

import React from 'react';
import Parser from 'html-react-parser';
import DomToReact from 'html-react-parser/lib/dom-to-react';

/**
 * Modifiers:
 *  Blend mode (TODO)
 *  Start from edge of grid
 *  Diagonal curtains (TODO)
 *  Opacity (TODO)
 *
 *  modifier="grid-edge"
 */

const ContentImageCurtains = (props, context) => {
  let baseClassName = 'cpnt-content-image-curtains';
  let vh = window.innerHeight || 800;
  let preload = vh/5;//fully load without having to go all the way up
  let images = props.domNode.children.filter(node => {
    return node.name === 'img';
  });

  function getClassNames() {
    let mods = '';
    let cTop = context.boundingRect.top - preload;

    mods += cTop < vh / 2 ? 'is-in-view' : '';
    mods += ' ';
    mods += props.layout ? '-' + props.layout : '';
    mods += ' ';
    mods += props.modifier ? '-' + props.modifier : '';

    return baseClassName + ' ' + mods;
  }

  // function getCurtainPull(direction) {
  //
  //   //Return - using is-in-view instead.
  //   return {};
  //
  //   let cTop = context.boundingRect.top - preload;
  //   let progress;
  //
  //   console.log('boundingRect.top: ', context.boundingRect.top);
  //
  //   //want curtains to be fully closed when component is 1vh from top
  //
  //   if (cTop > vh) {
  //     progress = 0 + '%';
  //   } else if (cTop < 0) {
  //     progress = 100 + '%';
  //   } else {
  //     progress = Math.floor( 100 - (cTop / vh * 100) ) + '%';
  //   }
  //
  //   switch (direction) {
  //     case 'U': return {transform: 'translate3d(0, -' + progress + ', 0)'};
  //     case 'D': return {transform: 'translate3d(0, ' + progress + ', 0)'};
  //     case 'L': return {transform: 'translate3d(-' + progress + ', 0, 0)'};
  //     case 'R': return {transform: 'translate3d(' + progress + ', 0, 0)'};
  //     //////////////////////////////////////////////////////////////////////////
  //     default: return {transform: 'translate3d(' + progress + ', 0, 0)'};
  //   }
  // }


  function getCurtains() {
    let curtains = props.layout.split('');

    //Only adds curtains for the directions requested.
    return curtains.map((dir, idx) => {
      if (dir === 'U') return (<div className="curtain -top" key={idx} />); //style={getCurtainPull("U")}
      if (dir === 'D') return (<div className="curtain -bottom" key={idx} />); //style={getCurtainPull("D")}
      if (dir === 'L') return (<div className="curtain -left" key={idx} />); //style={getCurtainPull("L")}
      if (dir === 'R') return (<div className="curtain -right" key={idx} />); //style={getCurtainPull("R")}
    })
  }

  return (
    <div className={getClassNames()} >
      <div className="img-wrap">
        {DomToReact(images)}
      </div>
      {getCurtains()}
    </div>
  )

};


ContentImageCurtains.contextTypes = {
  // scrollPosition: React.PropTypes.number,
  boundingRect: React.PropTypes.object
}

export default ContentImageCurtains;
