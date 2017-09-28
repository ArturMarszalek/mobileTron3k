using System;

namespace MobileTron3kApi.Models
{
    public class Summary
    {
        public DateTime OrderDate { get; set; }
        public int NumberOfOrders { get; set; }
        public decimal ValueOfOrders { get; set; }
    }
}
