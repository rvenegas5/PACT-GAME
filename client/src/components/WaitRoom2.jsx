import React from "react";
import { Button, Card, CardContent, CardActions } from "@mui/material/";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Loading } from "./Loading";
import { Theme } from "../config/Theme";

function WaitRoom2({ quit }) {
  const userName = localStorage.getItem("pact-game.userName");
  const room = localStorage.getItem("pact-game.roomCode");
  const message = "Esperando a otros jugadores...";
  // const user = JSON.parse(localStorage.getItem("pact-game.user"));
  const copyCode = () => {
    let tmp = document.createElement("input");
    document.getElementsByTagName("body")[0].appendChild(tmp);
    tmp.value = room;
    tmp.select();
    document.execCommand("copy");
    document.getElementsByTagName("body")[0].removeChild(tmp);
  };
  return (
    <Card className="waitRoom-container">
      <CardContent className="">
        <div className="row align-items-center my-3">
          <div className="container w-50 text-center justify-width">
            <div className="row justify-content-center">
              <h1 className="displaye-4">{userName}</h1>
              <h2 className="display-6">{message}</h2>
              <Loading />
            </div>
            <div className="roomCode-container row align-items-center justify-content-center">
              <div class="form-floating row my-3">
                <input
                  id="roomCode"
                  class="form-control p-2"
                  placeholder="..."
                  disabled
                ></input>
                <label
                  className="h5 text-center"
                  id="roomCodeLabel"
                  for="roomCode"
                >
                  {room}
                </label>
              </div>
              <div className="row">
                <Button onClick={copyCode} variant="contained">
                  <i>
                    <ContentPasteIcon />
                  </i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <div className="container text-center w-50 more-margin">
          <div className="row justify-content-center align-items-center">
            <Button onClick={quit} variant="contained">
              Salir
            </Button>
          </div>
        </div>
      </CardActions>
    </Card>
    // (
    //   <div
    //     sx={{ backgroundColor: "primary.main" }}
    //     className="py-3 container text-center"
    //   >
    //     <div className="row align-items-center my-3">
    //       <div className="container w-50 text-center">
    //         <div className="row justify-content-center">
    //           <h1 class="display-6">{message}</h1>
    //           <Loading />
    //         </div>
    //         <div className="row align-items-center justify-content-center">
    //           <div class="form-floating col-8 my-3">
    //             <input
    //               id="roomCode"
    //               class="form-control p-2"
    //               placeholder="Leave a comment here"
    //               disabled
    //             ></input>
    //             <label
    //               className="h5 text-center"
    //               id="roomCodeLabel"
    //               for="roomCode"
    //             >
    //               {room}
    //             </label>
    //           </div>
    //           <div className="col-4">
    //             <Button onClick={copyCode} variant="outlined">
    //               <i>
    //                 <ContentPasteIcon />
    //               </i>
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="container text-center w-50">
    //       <div className="row justify-content-center align-items-center">
    //         <Button onClick={quit} variant="contained">
    //           QUIT
    //         </Button>
    //       </div>
    //     </div>
    //   </div>
    // )
  );
}

export { WaitRoom2 };
