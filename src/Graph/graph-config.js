import * as React from 'react';
export const NODE_KEY = 'id';
export const TASK_TYPE = 'task';
export const WEEK_TYPE = 'week';
export const ACTUAL_WEEK_TYPE = 'actual_week';
export const EDGE_TYPE = 'edge';
export const nodeTypes = [TASK_TYPE, WEEK_TYPE, ACTUAL_WEEK_TYPE];
export const edgeTypes = [EDGE_TYPE];

const Week = (
    <symbol viewBox="0 0 200 200" id="week">
        <circle cx="100" cy="100" r="70" fill="rgb(216, 216, 216)" color="black"/>
    </symbol>
);

const ActualWeek = (
  <symbol viewBox="0 0 200 200" id="actual_week">
      <circle cx="100" cy="100" r="70" fill="rgb(111, 183, 214)" color="black"/>
  </symbol>
);

const Task = (
  <symbol viewBox="0 0 88 72" id="task" width="88" height="88">
    <path d="M 0 36 18 0 70 0 88 36 70 72 18 72Z" />
  </symbol>
);

const Edge = (
  <symbol viewBox="0 0 50 50" id="edge"/>
);

export default {
  EdgeTypes: {
    edge: {
      shape: Edge,
      shapeId: '#edge',
    },
  },
  NodeSubtypes: {
  },
  NodeTypes: {
    week: {
      shape: Week,
      shapeId: '#week',
      typeText: 'Week',
    },
    actual_week:{
      shape: ActualWeek,
      shapeId: '#actual_week',
      typeText: 'Week',
    },
    task: {
      shape: Task,
      shapeId: '#task',
      typeText: 'Task',
    }
  },
};