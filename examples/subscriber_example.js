'use strict';
/**
 * This example demonstrates simple sending of messages over the ROS system.
 */

let rosnodejs = require('../index.js');
// Requires the std_msgs message package
const std_msgs = rosnodejs.require('std_msgs').msg;

// Register node with ROS master
rosnodejs.initNode('/listener_node')
  .then((rosNode) => {
    // Create ROS subscriber on the 'chatter' topic expecting String messages
    let sub = rosNode.subscribe('/chatter', std_msgs.String,
      (data) => { // define callback execution
        rosnodejs.log.info('I heard: [' + data.data + ']');
      },
      {
        queueSize: 100,
        throttleMs: 10
      }
    );
  });
