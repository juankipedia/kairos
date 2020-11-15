import * as React from 'react';
export const NODE_KEY = 'id';
export const TASK_TYPE = 'task';
export const DELAYED_TASK_TYPE = 'delayed_task';
export const COMPLETED_TASK_TYPE = 'completed_task';
export const PAST_WEEK_TYPE = 'past_week';
export const FUTURE_WEEK_TYPE = 'future_week';
export const ACTUAL_WEEK_TYPE = 'actual_week';
export const EDGE_TYPE = 'edge';
export const nodeTypes = [TASK_TYPE, PAST_WEEK_TYPE, FUTURE_WEEK_TYPE, ACTUAL_WEEK_TYPE];
export const edgeTypes = [EDGE_TYPE];

const PastWeek = (
    <symbol viewBox="0 0 200 200" id="past_week">
        <circle cx="100" cy="100" r="100" fill="rgb(216, 216, 216)" color="black" fontSize="3em" />
    </symbol>
);

const FutureWeek = (
  <symbol viewBox="0 0 200 200" id="future_week">
      <circle cx="100" cy="100" r="100" fill="rgb(255, 250, 129)" color="black"/>
  </symbol>
);

const ActualWeek = (
  <symbol viewBox="0 0 200 200" id="actual_week">
      <circle cx="100" cy="100" r="100" fill="rgb(111, 183, 214)" color="black"/>
  </symbol>
);

const Task = (
  <symbol viewBox="-27 0 154 154"  id="task" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" fill="rgb(255, 250, 129)" />
  </symbol>
);

const DelayedTask = (
  <symbol viewBox="-27 0 154 154"  id="delayed_task" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" fill="rgb(252, 169, 133)"/>
  </symbol>
);

const CompletedTask = (
  <symbol viewBox="-27 0 154 154"  id="completed_task" width="154" height="154">
    <rect transform="translate(50) rotate(45)" width="109" height="109" fill="rgb(181, 225, 174)"/>
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
    past_week: {
      shape: PastWeek,
      shapeId: '#past_week',
      typeText: 'Week',
    },
    future_week: {
      shape: FutureWeek,
      shapeId: '#future_week',
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
    },
    delayed_task: {
      shape: DelayedTask,
      shapeId: '#delayed_task',
      typeText: 'Task',
    },
    completed_task: {
      shape: CompletedTask,
      shapeId: '#completed_task',
      typeText: 'Task',
    }
  },
};