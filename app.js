const fs = require("fs");
const yargs = require("yargs");

const filePath = "./data/tareas.json";

function getTareas() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function saveTareas(tareas) {
  fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2));
}

yargs.command({
  command: "crear",
  describe: "Crea una nueva tarea",
  builder: {
    titulo: {
      describe: "El título de la tarea",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    try {
      const tareas = getTareas();

      const nuevaTarea = {
        id: Date.now(),
        titulo: argv.titulo,
        completada: false,
      };

      tareas.push(nuevaTarea);
      saveTareas(tareas);

      console.log(`Tarea "${argv.titulo}" creada exitosamente.`);
    } catch (error) {
      console.error("Ha ocurrido un error inesperado.");
    }
  },
});

yargs.help().parse();
