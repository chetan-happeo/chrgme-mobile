import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { ImageBackground, StyleSheet, ScrollView, Dimensions, Alert } from "react-native";
import { LayoutSpacing } from "../constants/LayoutSpacing";
import { Button, Layout, Input, Text, Select, SelectItem, IndexPath } from "@ui-kitten/components";
import { filter, CountryProperty } from "country-codes-list"
import { ValidationRegexes } from "@/constants/ValidationRegexes";

export default function Onboarding() {
    const [name, setName] = useState("");
    const [ownerType, setOwnerType] = useState("Individual");
    const [email, setEmail] = useState("");
    const [countryPhoneCode, setCountryPhoneCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [taxId, setTaxId] = useState("");

    const ownerTypes = ["Individual", "Company"];
    const [dangerIndex, setDangerIndex] = useState(-1);

    const handleSubmit = () => {
        setDangerIndex
        if (!ValidationRegexes.name.test(name) || name === "") {
            setDangerIndex(0);
            return;
        }
        if (!ValidationRegexes.email.test(email) || email === "") {
            setDangerIndex(1);
            return;
        }
        if (!ValidationRegexes.phoneNumber.test(phoneNumber) || phoneNumber === "") {
            setDangerIndex(2);
            return;
        }
        if (!ValidationRegexes.website.test(website) || website === "") {
            setDangerIndex(3);
            return;
        }
        if (!ValidationRegexes.taxId.test(taxId) || taxId === "") {
            setDangerIndex(4);
            return;
        }

    };

    useEffect(() => {
        if (process.env.NODE_ENV === "development") {
            setName("John Doe");
            setEmail("chetan.kumar.fi@gmail.com");
            setPhoneNumber("1234567890");
            setWebsite("https://google.com");
            setTaxId("taxId123");
        }
    }, []);

    return (
        <>
            <Stack.Screen options={{ title: "Login" }} />
            <ScrollView style={styles.container}>
                <ImageBackground
                    source={require("../assets/images/bg/onboarding.png")}
                    style={styles.image}
                />
                <Layout style={styles.formContainer}>
                    <Text category="h5" style={styles.welcomeText}>
                        Welcome! Start your journey as an EV Charging Station Owner.
                    </Text>
                    <Text style={styles.descriptionText}>
                        Fill out the form below to register your business and become part of the growing network of EV charging stations.
                    </Text>
                    <Input
                        status={dangerIndex === 0 ? "danger" : "info"}
                        placeholder="Your Name"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="done"
                        style={styles.input}
                    />
                    <Select
                        value={ownerType}
                        onSelect={(index: IndexPath | IndexPath[]) => Array.isArray(index) ? setOwnerType(ownerTypes[index[0].row]) : setOwnerType(ownerTypes[index.row])}
                        placeholder="Select Owner Type"
                        style={styles.input}
                    >
                        {ownerTypes.map((type, index) => (
                            <SelectItem key={index} title={type} />
                        ))}
                    </Select>
                    <Input
                        status={dangerIndex === 1 ? "danger" : "info"}
                        placeholder="Your Email"
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType="done"
                        style={styles.input}
                        keyboardType="email-address"
                    />
                    <Select
                        value={countryPhoneCode}
                        placeholder="Select Country Phone Code"
                        style={styles.input}
                        onSelect={(index: IndexPath | IndexPath[]) => Array.isArray(index) ?
                            setCountryPhoneCode(filter("countryCode" as CountryProperty, "IN")[index[0].row].countryCallingCode) :
                            setCountryPhoneCode(filter("countryCode" as CountryProperty, "IN")[index.row].countryCallingCode)}
                    >
                        {
                            filter("countryCode" as CountryProperty, "IN").map((country, index) => {
                                return <SelectItem key={index} title={`+${country.countryCallingCode} - ${country.countryCode}`} />
                            })
                        }
                    </Select>
                    <Input
                        status={dangerIndex === 2 ? "danger" : "info"}
                        placeholder="Your Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        style={styles.input}
                        keyboardType="numeric"
                        returnKeyType="done"
                    />
                    <Input
                        status={dangerIndex === 3 ? "danger" : "info"}
                        placeholder="Your Website"
                        value={website}
                        onChangeText={setWebsite}
                        returnKeyType="done"
                        style={styles.input}
                        keyboardType="url"
                    />
                    <Input
                        status={dangerIndex === 4 ? "danger" : "info"}
                        placeholder="Your Tax ID"
                        value={taxId}
                        onChangeText={setTaxId}
                        returnKeyType="done"
                        style={styles.input}
                    />
                    <Button onPress={handleSubmit} style={styles.button}>
                        Submit
                    </Button>
                </Layout>
            </ScrollView>
        </>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: width,
        height: width * 0.75,
        justifyContent: "flex-end",
    },
    formContainer: {
        paddingVertical: LayoutSpacing.large,
        paddingHorizontal: LayoutSpacing.medium,
    },
    input: {
        marginVertical: LayoutSpacing.interpolate(1.5),
        textTransform: "uppercase",
    },
    button: {
        marginTop: LayoutSpacing.medium,
    },
    welcomeText: {
        marginBottom: LayoutSpacing.small,
        textAlign: 'center',
    },
    descriptionText: {
        marginBottom: LayoutSpacing.medium,
        textAlign: 'center',
    }
});
