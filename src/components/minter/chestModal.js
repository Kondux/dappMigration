// Component: ChestModal
// Def: Main ui for the chest

import React, { useState, useEffect } from "react";
// React Spring
import { useTransition, a } from "@react-spring/three";
// State
import { useImmer } from "use-immer";
import { state } from "./state";
// Components
import Grid from "./grid";
// Chest Audio

const ChestModal = ({ open, setOpen }) => {
    const [audio, setAudio] = useState(null);
    useEffect(() => {
        setAudio(new Audio("/close-chest.mp3"));
        // only run once on the first render on the client
    }, []);
    // Set immer state to our default state
    const [chestState, updateChestState] = useImmer(state);

    // Function to close the modal
    const closeModal = () => {
        setOpen(!open);
        audio.volume = 0.3;
        audio.play();
    };

    // Transitions via react-spring for when our modal mounts/unmounts
    // We fade in and fade out
    const transitions = useTransition(open, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });

    // Mount/unmount single-component reveals
    return transitions(
        ({ item, key, props }) =>
            item && (
                <a.div key={key} style={props} className="modal-chest-wrapper">
                    <div onClick={closeModal} className="overlay" />
                    <div className="modal-chest">
                        <div className="top">
                            <div className="header">
                                <h4>Chest</h4>
                                <div onClick={closeModal} className="close">
                                    x
                                </div>
                            </div>
                            <Grid
                                chestState={chestState}
                                updateChestState={updateChestState}
                                inventoryType="chestState"
                            />
                        </div>
                        <div className="middle">
                            <div className="header">
                                <h4>Inventory</h4>
                            </div>
                            <Grid
                                chestState={chestState}
                                updateChestState={updateChestState}
                                inventoryType="inventoryState"
                            />
                        </div>
                        <div className="bottom">
                            <Grid
                                chestState={chestState}
                                updateChestState={updateChestState}
                                inventoryType="hotBarState"
                            />
                        </div>
                    </div>
                </a.div>
            )
    );
};

export default ChestModal;
