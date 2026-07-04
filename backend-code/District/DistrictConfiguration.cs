using HautSphereApi.Models.Entities.Master;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HautSphereApi.Data.Configurations.Master
{
    public class DistrictConfiguration : IEntityTypeConfiguration<District>
    {
        public void Configure(EntityTypeBuilder<District> builder)
        {
            builder.ToTable("DISTRICT");

            builder.HasKey(d => d.Id);

            builder.Property(d => d.Id)
                .HasColumnName("DistId")
                .HasColumnType("int")
                .ValueGeneratedOnAdd();

            builder.Property(d => d.CID)
                .HasColumnName("CID")
                .HasColumnType("int")
                .IsRequired();

            builder.Property(d => d.SID)
                .HasColumnName("SID")
                .HasColumnType("int")
                .IsRequired();

            builder.Property(d => d.DistName)
                .HasColumnName("DistName")
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(d => d.Active)
                .HasColumnName("Active")
                .HasDefaultValue(true);

            builder.Ignore(d => d.IsDeleted);
            builder.Ignore(d => d.CreatedBy);
            builder.Ignore(d => d.CreatedDate);
            builder.Ignore(d => d.UpdatedBy);
            builder.Ignore(d => d.UpdatedDate);

            builder.HasOne(d => d.Country)
                .WithMany()
                .HasForeignKey(d => d.CID)
                .HasConstraintName("FK_DISTRICT_COUNTRY");

            builder.HasOne(d => d.State)
                .WithMany()
                .HasForeignKey(d => d.SID)
                .HasConstraintName("FK_DISTRICT_STATE");
        }
    }
}
