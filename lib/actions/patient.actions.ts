"use server";

import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utills";
import { InputFile } from "node-appwrite/file";

// export async function createUser(user: CreateUserParams) {
//   try {
//     console.log("try ici salam");
//     const newUser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       // undefined,
//       "securePassword123",
//       user.name
//     );
//     console.log("Yeni kullanici: ", newUser);
//     return newUser;
//   } catch (error: any) {
//     if (error && error.code === 409) {
//       const documents = await users.list([Query.equal("email", [user.email])]);

//       return documents?.users[0];
//     }
//   }
// }

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      "passwrod123",
      user.name
    );
    return newUser; // <-- burası eksikti
  } catch (error: any) {
    console.error("Kullanıcı oluşturulamadı. Hata:", error);

    if (error.code === 409) {
      // Kullanıcı zaten varsa, onu bulup döndür
      const documents = await users.list([Query.equal("email", [user.email])]);
      console.log("Zaten mevcut kullanıcı:", documents);
      return documents.users[0];
    }

    // Diğer hataları da logla
    console.error("Beklenmeyen hata oluştu:", error);
    throw error;
  }
}

export async function getUser(userId: string) {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

export async function registerPatient({
  identificationDocument,
  ...patient
}: RegisterUserParams) {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("filename") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
        gender: patient.gender.toLowerCase(),
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}

export async function getPatient(userId: string) {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("user_id", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log("ERROR: ", error);
  }
}
