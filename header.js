// ==UserScript==
// additional copyright/license info:
//© All Rights Reserved
//
//Chess.com Enhanced Experience © 2024 by Akashdeep
//
// ==UserScript
// @name         Chess.com UltraX bot with Panel
// @namespace    Akashdeep
// @version      1.0.0.5
// @description  Enhances your Chess.com experience with move suggestions, UI enhancements, and customizable features.  Credits to GoodtimeswithEno for the initial move highlighting and basic chess engine implementation.
// @author       Akashdeep
// @license      Chess.com Enhanced Experience © 2024 by Akashdeep, © All Rights Reserved
// @match       https://www.chess.com/play/*
// @match       https://www.chess.com/game/*
// @match       https://www.chess.com/puzzles/*
// @match       https://www.chess.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_getResourceText
// @grant       GM_registerMenuCommand
// @resource    stockfish.js        https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @run-at      document-start
// @liscense MIT

// @downloadURL
// @updateURL
// ==/UserScript==

const currentVersion = '1.0.0.5'; // Sets the current version
