'use strict';
/**
 * This example demonstrates simple sending of messages over the ROS system.
 */

let rosnodejs = require('../index.js');
// Requires the std_msgs message package
const std_msgs = rosnodejs.require('std_msgs').msg;

// Register node with ROS master
rosnodejs.initNode('/talker_node')
  .then((rosNode) => {
    // Create ROS publisher on the 'chatter' topic with String message
    let pub = rosNode.advertise( '/chatter', std_msgs.String,
      {
        queueSize: 1,
        latching: true,
        throttleMs: 9
      }
    );
    let count = 0;
    const msg = new std_msgs.String();
    // Define a function to execute every 100ms
    setInterval(() => {
      // Construct the message
      msg.data = 'hello world ' + count;
      // Publish over ROS
      pub.publish(msg);
      // Log through stdout and /rosout
      rosnodejs.log.info('I said: [' + msg.data + ']');
      ++count;
    }, 100);
  });
