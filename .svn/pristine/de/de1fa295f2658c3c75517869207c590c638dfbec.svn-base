using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.DAL
{
    public interface IDataFactory<Entity, Query>
    {
        int AddEntity(Entity entity);

        bool DelEntity(int id);

        bool UpdateEntity(int id, Entity newentity);

        Entity GetEntity(int id);

        List<Entity> GetEntities(Query query);

        List<Entity> GetEntities(Query query, int pageSize, int pageNumber, out int totalNumber);
    }
}
