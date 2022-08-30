import { TodosAccess } from '../datalayer/todosAcess'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const todosAccess = new TodosAccess()
const logger = createLogger('Processing for todos')

export async function getAllTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('Processing to get all todos items for user id ' + userId);
    return todosAccess.getAllTodosForUser(userId)
}
export async function createTodo(userId: string, newTodo: CreateTodoRequest): Promise<TodoItem> {
  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()  
  let newItem: TodoItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    ...newTodo,
    attachmentUrl: ''
  }
  logger.info('Processing to create todo item ' + newItem);
  return await todosAccess.createTodo(newItem)
}
  
export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoUpdate> {
  let todoUpdate: TodoUpdate = {...updatedTodo}
  logger.info('Processing to update todo with user id ' + userId);
  return todosAccess.updateTodo(userId, todoId, todoUpdate)
}

export async function updateAttachmentUrl(userId: string, todoId: string, attachmentUrl: string): Promise<string> {
  logger.info('Processing to update url for user id ' + userId);
  return todosAccess.updateAttachmentUrl(userId, todoId, attachmentUrl)
}

export async function deleteTodo(userId: string, todoId: string) {
  logger.info('Processing to delete todo with user id ' + userId);
  return todosAccess.deleteTodo(userId, todoId)
    
}