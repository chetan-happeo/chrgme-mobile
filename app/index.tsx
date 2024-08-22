import { Layout } from '@ui-kitten/components';
import { Link, Stack } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

const SignupAndLoginScreen = () => {
    return (
        <>
            <Stack.Screen />
            <Layout style={styles.container}>
                <Link href={"/onboarding"}>Onboarding</Link>
            </Layout>
        </>);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});



export default SignupAndLoginScreen;