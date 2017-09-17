/**
 * Copyright (c) 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a
 * copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

/**
 * This script sets up Firebase.
 *
 * Remember to include this script in the <head> of a page if you plan on using
 * Firebase within that page.
 */
(function() {
  'use strict';

  /**
   * Firebase will be initialized with this config object.
   *
   * @type {!Object}
   * @const
   */
  var config_ = {
    apiKey: "AIzaSyBMRzRE3GqEr5n_83YHTTd8i1DjnWZHeYY",
    authDomain: "eyewatch-4b997.firebaseapp.com",
    databaseURL: "https://eyewatch-4b997.firebaseio.com",
    projectId: "eyewatch-4b997",
    storageBucket: "eyewatch-4b997.appspot.com",
    messagingSenderId: "584331263290"
  };
  firebase.initializeApp(config_); console.log("firebase initialized");
})();