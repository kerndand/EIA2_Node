
    interface AssocStringString {
        [key: string]: string;
}
    // Struktur des heterogenen assoziativen Arrays als Datensatz für eine studierende Person
    interface Studi {
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }

    interface Studi2 {
        _id: string;
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }