
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

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
     interface Studis {
    }
 
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
    let studiHomoAssoc: Studis = {};  