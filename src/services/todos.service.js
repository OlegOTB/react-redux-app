import httpService from "./http.service";
const todosEndpoint = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 10 },
    });
    return data;
  },
  create: async (titleTask) => {
    const { data } = await httpService.post(todosEndpoint, {
      title: titleTask,
      completed: false,
    });
    return data;
  },
};

export default todosService;
