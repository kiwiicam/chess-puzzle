import React, { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { Chess } from "chess.js";

const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://cdn.jsdelivr.net/npm/chessboardjsx@1.3.0/dist/chessboard-1.0.0.min.js"></script>
  </head>
  <body style="margin:0;overflow:hidden;">
    <div id="board" style="width:100vw;height:100vh;"></div>
    <script>
      const board = Chessboard('board', {
        draggable: true,
        position: 'start',
        onDrop: function (source, target) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ source, target }));
          return 'snapback';
        },
      });

      function updateBoard(fen) {
        board.position(fen, false);
      }

      document.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "update") updateBoard(data.fen);
      });
    </script>
  </body>
  </html>
`;

export default function ChessBoard({ fen, onMove }) {
  const webViewRef = useRef(null);
  const [game] = useState(new Chess(fen || "start"));

  useEffect(() => {
    if (fen)
      webViewRef.current?.postMessage(JSON.stringify({ type: "update", fen }));
  }, [fen]);

  const onMessage = (event) => {
    const move = JSON.parse(event.nativeEvent.data);
    const result = game.move({ from: move.source, to: move.target });
    if (result) onMove(game.fen(), result);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html }}
        onMessage={onMessage}
        javaScriptEnabled={true}
        style={{ flex: 1 }}
      />
    </View>
  );
}
