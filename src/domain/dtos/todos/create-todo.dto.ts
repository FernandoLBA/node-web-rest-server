export class CreateTodoDto {
  // * Este constructor privado solo se puede llamar dentro de la clase
  private constructor(public readonly text: string) {}

  // * [key: string]: any se usa para que pueda recibir cualquier key, ejm: ["text"] o ["createdAt"]
  static create(props: { [key: string]: any }): [string?, CreateTodoDto?] {
    // * Como estamos creando solo necesitamos la propiedad text
    const { text } = props;

    if (!text || text.length === 0) return ["Text property is required", undefined];

    // * Retorna una instancia del cosntructor privado con el text
    return [undefined, new CreateTodoDto(text)];
  }
}
