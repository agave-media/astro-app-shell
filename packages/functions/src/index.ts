import * as functions from "firebase-functions";
import * as postmark from "postmark";

const client = new postmark.ServerClient("e6ace7e6-7e15-4271-8f0f-9e68dc3a0f74");

exports.sendConfirmationEmail = functions.firestore.document("registrations/{id}").onCreate(async (snap, context) => {
	const newRegistration = snap.data();
	functions.logger.log("sending confirmation email:", newRegistration);

    try {
        const emailResponse = await client.sendEmailWithTemplate({
            From: "krivera@agavemedia.io",
            To: "krivera@agavemedia.io",
            TemplateAlias: "registration_confirmation",
            TemplateModel: {
                raceType: newRegistration.raceType,
                raceCategory: newRegistration.raceCategory,
                size: newRegistration.size,
                id: newRegistration.id,
            },
        });
        functions.logger.log('email response:', emailResponse)
        
        if (emailResponse?.Message === "OK") return Promise.resolve(true)
        return Promise.resolve(false);
    } catch (err) {
        functions.logger.warn("confirmation email error:", err)
        return Promise.resolve(false);
    }
});
