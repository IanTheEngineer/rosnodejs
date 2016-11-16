'use strict';
/**
 * This example demonstrates simple setting and retrieving of ROS
 * Parameters through the Parameter-Server.
 */

let rosnodejs = require('../index.js');

// Register node with ROS master
rosnodejs.initNode('/parameter_example_node')
  .then((rosNode) => {
    // Define Parameter Name and Value
    let param_name = '~junk_parameter';
    let param_val = {'hi': 2};
    // Set Parameter value through the Parameter Server
    rosNode.setParam(param_name, param_val).then(() => {
      // Get Parameter value from Parameter Server
      rosNode.getParam(param_name).then((val) => {
        // Log retrieved Parameter value
        rosnodejs.log.info('Got Param named "'+ param_name +
                           '", with value, ' + JSON.stringify(val));
      });
    });
  });
