using MassTransit;
using TokenService.RabbitMQModels;

namespace ScheduleService.Consumers
{
    public class ProductConsumer : IConsumer<CustomerProduct>
    {
        public async Task Consume(ConsumeContext<CustomerProduct> context)
        {
            await Task.Run(() => { var obj = context.Message; });
        }
    }
}
