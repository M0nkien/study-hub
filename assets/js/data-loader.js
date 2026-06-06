// Study Hub – pomocné načítavanie JSON dát

async function loadStudyHubJson(path) {
    const response = await fetch(path);
    if (!response.ok) {
        throw new Error("Nepodarilo sa načítať JSON: " + path);
    }
    return response.json();
}
