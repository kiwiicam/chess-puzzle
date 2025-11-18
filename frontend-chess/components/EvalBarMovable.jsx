import { useState } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
} from "react-native-reanimated";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";

export default function EvalBarMovable() {
    const x = useSharedValue(150);

    const startX = useSharedValue(150);

    const pan = Gesture.Pan()
        .onStart(() => {
            startX.value = x.value;
        })
        .onUpdate((e) => {
            x.value = Math.min(295, Math.max(5, startX.value + e.translationX));
        });

    const knobStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }],
        height: x.value < 30 || x.value > 270 ? x.value < 30 ? 50 - (30 - x.value) : 50 - (x.value - 270) : 46
    }));

    const blackStyle = useAnimatedStyle(() => ({
        width: x.value + 5
    }));

    const whiteStyle = useAnimatedStyle(() => ({
        width: 305 - x.value
    }));

    return (
        <GestureHandlerRootView style={styles.track}>
            <Animated.View style={[styles.black, blackStyle]} />
            <GestureDetector gesture={pan}>
                <Animated.View style={[styles.knob, knobStyle]} />
            </GestureDetector>
            <Animated.View style={[styles.white, whiteStyle]} />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    track: {
        width: 310,
        height: 50,
        backgroundColor: "#855252ff",
        borderRadius: 30,
        justifyContent: "center",
    },
    knob: {
        width: 10,
        backgroundColor: "#798a9eff",
        borderRadius: 25,
        position: "absolute",
        zIndex: 5
    },
    white: {
        position: "absolute",
        right: 0,
        backgroundColor: "#fff",
        height: 50,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    black: {
        position: "absolute",
        backgroundColor: "#111",
        height: 50,
        left: 0,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    }
});
