
     interface AssocStringString {
        [key: string]: string;
    }
    
    interface Studi {
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }
    
    interface StudiID {
        _id: string;
        name: string;
        firstname: string;
        matrikel: number;
        age: number;
        gender: boolean;
        studiengang: string;
    }

    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
     interface Studis {         [matrikel: string]: Studi;
    }
 
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
     let studiHomoAssoc: Studis = {};  
