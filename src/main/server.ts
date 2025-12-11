import { prisma } from "../config/prisma";

async function start() {
  try {
    const app = (await import("./config/app")).default;
    await prisma.$connect();
    console.log("connected");
    app.listen(3000, () => {
      console.log("Listen on 3000");
    });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    process.exit(1);
  }
}

start();
