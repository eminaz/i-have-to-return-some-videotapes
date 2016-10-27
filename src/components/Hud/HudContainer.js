import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import immutableToJs from 'utils/immutableToJs';

import level from 'state/models/level';

import { initialState } from 'state/initialState';

import { toUpdateTime } from 'state/actions/updateTime';

import { toMove } from 'state/actions/move';

import get from 'lodash/get'


import Hud from 'components/Hud/Hud';

function mapStateToProps(state) {
  const playerCol = state.get('player').get('col')
  const playerRow = state.get('player').get('row')

  //todo: bad practice, please change
  //console.log('~~ ', state.toJS().level.entities[playerRow][playerCol])
  const stateJS = state.toJS()
  const entities = stateJS.level.entities
  const visited = stateJS.level.visitedEntities

  const neighbors = {
    left: get(entities, `${playerRow}.${playerCol-1}.type`),
    right: get(entities, `${playerRow}.${playerCol+1}.type`),
    up: get(entities, `${playerRow-1}.${playerCol}.type`),
    down: get(entities, `${playerRow+1}.${playerCol}.type`),
  }
  const visitedNeighbors = {
    left: get(visited, `${playerRow}.${playerCol-1}`),
    right: get(visited, `${playerRow}.${playerCol+1}`),
    up: get(visited, `${playerRow-1}.${playerCol}`),
    down: get(visited, `${playerRow+1}.${playerCol}`),
  }
  const direction = state.get('player').get('direction')

  return {
    health: state.get('health'),
    healthTotal: initialState.get('health'),
    numDeaths: state.get('deaths'),
    numTapesCollected: state.get('numTapes'),
    numTapesTotal: level.getNumTapesTotal(state),
    powerups: immutableToJs(state.get('powerups')),
    time: state.get('time'),
    neighbors,
    direction,
    visitedNeighbors
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onTick(direction) {
      //dispatch(toUpdateTime());
      dispatch(toMove(direction))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hud);
